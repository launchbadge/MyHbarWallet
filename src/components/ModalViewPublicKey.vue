<template>
    <div class="view-public-key">
        <Modal
            :is-open="isOpen"
            :title="$t('modalViewPublicKey.title')"
            @change="this.$listeners.change"
        >
            <ReadOnlyInput multiline :value="publicKey" />
            <div class="container">
                <Button :label="$t('common.copy')" @click="handleCopy" />
            </div>
        </Modal>
    </div>
</template>

<script lang="ts">
import { createComponent, PropType } from "@vue/composition-api";
import Modal from "./Modal.vue";
import ReadOnlyInput from "./ReadOnlyInput.vue";
import { writeToClipboard } from "../clipboard";
import { ALERT } from "../store/actions";
import store from "../store";
import Button from "./Button.vue";

interface Props {
    isOpen: boolean;
    publicKey: string;
}

export default createComponent({
    components: {
        Modal,
        ReadOnlyInput,
        Button
    },
    model: {
        prop: "isOpen",
        event: "change"
    },
    props: {
        isOpen: (Boolean as unknown) as PropType<boolean>,
        publicKey: (String as unknown) as PropType<string>
    },
    setup(props: Props) {
        async function handleCopy(): Promise<void> {
            await writeToClipboard(
                props.publicKey == null ? "" : props.publicKey
            );

            store.dispatch(ALERT, {
                level: "info",
                message: "Copied"
            });
        }

        return { handleCopy };
    }
});
</script>

<style scoped lang="postcss">
.container {
    display: flex;
    justify-content: center;
    margin-block-start: 30px;
}
</style>
