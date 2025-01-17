/* eslint-env node */
module.exports = {
    root: true,
    extends: [
        "@launchbadge/eslint-config/vue",
        "@launchbadge/eslint-config/vue-typescript"
    ],
    rules: {
        // v-html is used for rich text formatting for i18n
        "vue/no-v-html": "off",
        // lints that were added later and should eventually be fixed and removed here
        // so they are defaulted back to error
        "unicorn/consistent-function-scoping": "warn",
        "unicorn/expiring-todo-comments": "warn"
    }
};
