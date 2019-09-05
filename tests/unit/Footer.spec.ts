import { createLocalVue, mount } from "@vue/test-utils";
import Footer from "../../src/components/Footer.vue";
import VueCompositionApi from "@vue/composition-api";

describe("Footer.vue", (): void => {
    const localVue = createLocalVue();
    localVue.use(VueCompositionApi);

    it("renders", (): void => {
        const wrapper = mount(Footer, {
            localVue
        });

        expect(wrapper).toMatchInlineSnapshot(`
            <footer>
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
                  <div class="donation"><img src="../assets/icon-hbar-outline2.svg" class="hbar-icon">
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
                              <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="Browser" type="text" autocomplete="on"> <!----></span>
                              <!----></span></label>
                            <!---->
                            <!---->
                          </div>
                          <div class="text-input issue-item"><label class="label-container">
                              <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="Operating System" type="text" autocomplete="on"> <!----></span>
                              <!----></span></label>
                            <!---->
                            <!---->
                          </div>
                          <div class="text-input issue-item"><label class="label-container">
                              <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="Device/Wallet type (if any)" type="text" autocomplete="on"> <!----></span>
                              <!----></span></label>
                            <!---->
                            <!---->
                          </div>
                          <div class="text-input issue-item"><label class="label-container">
                              <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="Account ID (if any)" type="text" autocomplete="on"> <!----></span>
                              <!----></span></label>
                            <!---->
                            <!---->
                          </div>
                          <div class="text-input issue-item"><label class="label-container">
                              <!----> <span class="input-container"><!----> <span class="input-wrapper"><input placeholder="URL" type="text" autocomplete="on"> <!----></span>
                              <!----></span></label>
                            <!---->
                            <!---->
                          </div>
                          <div class="text-input issue-item is-multiline"><label class="label-container">
                              <!----> <span class="input-container"><!----> <span class="input-wrapper"><textarea placeholder="Describe the issue" rows="8" class="text-area resize"></textarea> <!----></span>
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
              <div class="wrapper">
                <div class="links">
                  <router-link to="[object Object]" class="link">
                    Privacy
                  </router-link>
                  <router-link to="[object Object]" class="link">
                    Terms
                  </router-link> <a target="_blank" href="https://github.com/hashgraph/myhbarwallet" class="link">
                    v1.1.1+placeholderhash
                  </a>
                </div>
                <div class="copyright">
                  © 2019 Hedera Hashgraph LLC. All Rights
                  reserved.
                </div>
                <div class="social">
                  <!---->
                  <!----> <a rel="noopener" target="_blank" href="https://www.github.com/hashgraph/MyHbarWallet" class="social-link"><svg width="24" height="24" viewBox="0 0 24 24" class="social-icon">
                      <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path>
                    </svg></a></div>
              </div>
            </footer>
        `);
    });
});
