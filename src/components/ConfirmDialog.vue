<!-- <template>
    <div id="q-app" style="min-height: 100vh;">
        <div class="q-pa-md q-gutter-sm">
            <q-btn label="Confirm" color="primary" @click="confirm"></q-btn>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
    name: 'ConfirmDialog',
    setup(props,{emit}) {
        const $q = useQuasar();

        function confirm() {
            emit('onConfirmed');
            $q.dialog({
                dark: true,
                title: 'Delete',
                message: 'Are you sure?',
                cancel: true,
                persistent: true,
            }).onOk(() => {
                // console.log('>>>> OK')
            }).onOk(() => {
                // console.log('>>>> second OK catcher')
            }).onCancel(() => {
                // console.log('>>>> Cancel')
            })
                .onDismiss(() => {
                    // console.log('I am triggered on both OK and Cancel')
                });
        }

        return { confirm };
    },
});
</script>

<style lang="sass" scoped>

</style>
 -->
