import { inject } from 'vue';

export default (await import('vue')).defineComponent({
    setup() {
        const cryptojs = inject('cryptojs');
        return {
            cryptojs,
            input
        };
    },
    methods: {
        getCrypto() {
            console.log('ciao mi chiamo karim e sono una prova per vedere s');
        }
    }, created() {
    }
});
