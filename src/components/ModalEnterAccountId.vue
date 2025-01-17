<template>
    <div class="modal-enter-account-id">
        <Modal
            :is-open="isOpen"
            :title="$t('modalEnterAccountId.title')"
            @change="handleModalChangeIsOpen"
            @click.native="handleInputNotFocused"
        >
            <template v-slot:banner>
                <Notice class="notice" :symbol="mdiHelpCircleOutline">
                    {{ $t("modalEnterAccountId.hederaAccountIdsAre") }}
                </Notice>
            </template>
            <form @submit.stop.prevent="handleSubmit">
                <TextInput
                    ref="input"
                    :value="state.input"
                    show-validation
                    :valid="valid"
                    :error="state.errorMessage"
                    :placeholder="$t('common.accountSyntax')"
                    @input="handleInput"
                    @click.native.stop
                />
                <div class="buttons">
                    <Button
                        compact
                        outline
                        :label="$t('modalEnterAccountId.noAccountId')"
                        class="button"
                        type="button"
                        @click="handleDontHaveAccount"
                        @focus.native="handleInputNotFocused"
                    />
                    <Button
                        compact
                        :label="$t('common.continue')"
                        class="button"
                        type="submit"
                        :disabled="!valid"
                        :busy="state.isBusy"
                    />
                </div>
            </form>
        </Modal>
    </div>
</template>

<script lang="ts">
import {
    createComponent,
    computed,
    watch,
    PropType,
    reactive,
    ref,
    SetupContext
} from "@vue/composition-api";
import Modal from "../components/Modal.vue";
import TextInput from "../components/TextInput.vue";
import Button from "../components/Button.vue";
import { Id } from "../store/modules/wallet";
import settings from "../settings";
import Notice from "../components/Notice.vue";
import { mdiHelpCircleOutline } from "@mdi/js";

export interface Props {
    isOpen: boolean;
    privateKey: import("@hashgraph/sdk").Ed25519PrivateKey | null;
}

interface State {
    input: string;
    failed: string | null;
    errorMessage: string | null;
    isBusy: boolean;
    account: Id | null;
}

export default createComponent({
    components: {
        Modal,
        TextInput,
        Button,
        Notice
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        privateKey: (Object as unknown) as PropType<
            import("@hashgraph/sdk").Ed25519PrivateKey | null
        >,
        isOpen: (Boolean as unknown) as PropType<boolean>
    },
    setup(props: Props, context: SetupContext) {
        const state = reactive<State>({
            input: "",
            failed: null,
            errorMessage: null,
            isBusy: false,
            account: null
        });

        const shardRealmAccountRegex = /^\d+\.\d+\.\d+$/;
        const partialRegex = /^\d{1,}$/;

        const valid = computed(() => shardRealmAccountRegex.test(state.input));
        const partialValid = computed(() => partialRegex.test(state.input));

        const input = ref<HTMLInputElement | null>(null);

        function handleInputNotFocused(): void {
            if (partialValid.value) {
                state.input = "0.0." + state.input;
            }
        }

        function handleInput(accountText: string): void {
            state.errorMessage = null;
            state.input = accountText;
        }

        function handleModalChangeIsOpen(isOpen: boolean): void {
            context.emit("change", isOpen);
        }

        function handleDontHaveAccount(): void {
            context.emit("noAccount");
        }

        async function handleSubmit(): Promise<void> {
            state.errorMessage = null;
            state.isBusy = true;

            if (valid.value) {
                const parts = state.input.split(".");
                state.account = {
                    shard: parseInt(parts[0]),
                    realm: parseInt(parts[1]),
                    account: parseInt(parts[2])
                };
            } else {
                state.account = null;
            }

            if (state.account == null || props.privateKey == null) {
                throw new Error("unexpected submission of EnterAccountID");
            }

            const { Client, HederaError, ResponseCodeEnum } = await (import(
                "@hashgraph/sdk/"
            ) as Promise<typeof import("@hashgraph/sdk/")>);

            let client;

            try {
                client = new Client({
                    // TODO: Use nodeId from settings
                    nodes: {
                        [settings.network.proxy]: {
                            shard: 0,
                            realm: 0,
                            account: 3
                        }
                    },
                    operator: {
                        account: state.account,
                        privateKey: props.privateKey.toString()
                    }
                });

                // In Hedera, the signature map is checked BEFORE
                // the valid duration. If we fail on the signature map
                // then we know the account ID is mismatched to the private key.

                const { CryptoTransferTransaction } = await import(
                    "@hashgraph/sdk"
                );
                await new CryptoTransferTransaction(client)
                    .addSender(state.account, 0)
                    .addRecipient({ realm: 0, shard: 0, account: 3 }, 0)
                    .setTransactionFee(1)
                    .build()
                    .executeForReceipt();
            } catch (error) {
                if (error instanceof HederaError) {
                    if (
                        error.code ===
                            ResponseCodeEnum.PAYER_ACCOUNT_NOT_FOUND ||
                        error.code === ResponseCodeEnum.INVALID_ACCOUNT_ID
                    ) {
                        state.errorMessage = context.root
                            .$t("common.error.payerAccountNotFound")
                            .toString();

                        return;
                    } else if (
                        error.code === ResponseCodeEnum.INVALID_SIGNATURE
                    ) {
                        state.errorMessage = context.root
                            .$t("common.error.invalidSignature")
                            .toString();

                        return;
                    } else if (
                        error.code ===
                        ResponseCodeEnum.INVALID_TRANSACTION_START
                    ) {
                        state.errorMessage =
                            "Invalid date time. Check your current system time.";
                        return;
                    } else if (
                        error.code === ResponseCodeEnum.INSUFFICIENT_TX_FEE
                    ) {
                        // This is actually good here
                        context.emit("submit", client, state.account);
                        return;
                    }
                } else if (
                    error instanceof Error &&
                    error.message === "Response closed without headers"
                ) {
                    state.errorMessage = context.root
                        .$t("common.error.noConnection")
                        .toString();

                    return;
                }

                throw error;
            } finally {
                state.isBusy = false;
            }
        }

        watch(
            () => props.isOpen,
            (newVal: boolean) => {
                if (newVal && input.value != null) {
                    // Clear input every time we reopen this modal
                    state.input = "";
                    input.value.focus();
                }
            }
        );

        return {
            state,
            valid,
            partialValid,
            input,
            handleInput,
            handleInputNotFocused,
            handleModalChangeIsOpen,
            handleDontHaveAccount,
            handleSubmit,
            mdiHelpCircleOutline
        };
    }
});
</script>

<style scoped lang="postcss">
.button {
    width: 213px;

    @media (max-width: 425px) {
        width: 100%;

        &:first-child {
            margin-block-end: 15px;
        }
    }
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-block-start: 40px;
    width: 100%;

    @media (max-width: 425px) {
        align-items: center;
        flex-direction: column;
    }
}
</style>
