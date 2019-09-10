import { createLocalVue, mount } from "@vue/test-utils";
import FooterTop from "../../src/components/FooterTop.vue";
import VueCompositionApi from "@vue/composition-api";

describe("FooterTop.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);
    it("renders", (): void => {
        const wrapper = mount(FooterTop, {
            localVue
        });
        expect(wrapper).toMatchInlineSnapshot(`
            <div class="footer-top">
              <div class="section">
                <div class="title">Discover</div>
                <div class="item">
                  <router-link to="[object Object]" class="link">
                    Units
                  </router-link>
                </div>
                <div class="item">
                  <router-link to="[object Object]" class="link">
                    Buy a Hardware Wallet
                  </router-link>
                </div>
              </div>
              <!---->
              <div class="section">
                <div class="title">MHW</div>
                <div class="item">
                  <router-link to="[object Object]" class="link">
                    About
                  </router-link>
                </div>
                <div class="item">
                  <router-link to="[object Object]" class="link">
                    FAQs
                  </router-link>
                </div>
                <div class="item customer-service">
                  Customer Support
                </div>
              </div>
              <div class="section">
                <div class="title">
                  Love
                  <img src="../assets/heart.svg" class="love">
                  MHW? Donate!
                </div>
                <div class="item">
                  MyHbarWallet is open-source and free to the community. Your
                  donations go a long way towards making that possible.
                </div>
                <div class="donation"><img src="" class="hbar-icon">
                  0.0.1001
                </div>
              </div>
              <div role="dialog" aria-modal="true" class="modal-background">
                <div class="modal">
                  <header><span class="title">Issue Information</span> <svg width="24" height="24" viewBox="0 0 24 24" class="close">
                      <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path>
                    </svg></header>
                  <div class="main">
                    <div class="content-container">
                      <form class="modal-issue-information">
                        <div class="text-input issue-item"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Browser" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                            <!----></span></label>
                          <!---->
                          <!---->
                        </div>
                        <div class="text-input issue-item"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Operating System" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                            <!----></span></label>
                          <!---->
                          <!---->
                        </div>
                        <div class="text-input issue-item"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Device/Wallet type (if any)" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                            <!----></span></label>
                          <!---->
                          <!---->
                        </div>
                        <div class="text-input issue-item"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="Account ID (if any)" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                            <!----></span></label>
                          <!---->
                          <!---->
                        </div>
                        <div class="text-input issue-item"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><input placeholder="URL" type="text" autocomplete="on"></div> <div class="deco-flex-item"><!----></div></div></span>
                            <!----></span></label>
                          <!---->
                          <!---->
                        </div>
                        <div class="text-input issue-item is-multiline"><label class="label-container">
                            <!----> <span class="input-container"><!----> <span class="input-wrapper"><div class="flex-container"><div class="text-flex-item"><textarea placeholder="Describe the issue" rows="8" class="text-area resize"></textarea></div> <div class="deco-flex-item"><!----></div></div></span>
                            <!----></span></label>
                          <!---->
                          <!---->
                        </div> <button type="submit" class="send-button compact"><span>Send</span>
                          <!----></button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `);
    });
});