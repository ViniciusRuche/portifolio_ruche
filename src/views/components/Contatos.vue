<script setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { Send, Mail, MessageSquare, User, Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const isSubmitting = ref(false)
const isSuccess = ref(false)

const schema = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(3, 'Nome muito curto'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  mensagem: yup.string().required('A mensagem não pode estar vazia').min(10, 'Conte-me um pouco mais'),
})

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema: schema,
})

const [nome, nomeProps] = defineField('nome')
const [email, emailProps] = defineField('email')
const [mensagem, mensagemProps] = defineField('mensagem')

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    const serviceID = 'service_pfb30ho'
    const templateID = 'template_s0y709o'
    const publicKey = 'RHiTEAEH7-qjyyoMo'

    await emailjs.send(
      serviceID, 
      templateID, 
      {
        name: values.nome,
        title: 'Nova mensagem do portfólio',
        email: values.email,
        message: values.mensagem,
      }, 
      publicKey
    )
    isSuccess.value = true
    resetForm()
    setTimeout(() => {
      isSuccess.value = false
    }, 5000)
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
  } finally {
    isSubmitting.value = false
  }

})
</script>

<template>
  <section id="contato" class="py-24 bg-[#050505] relative overflow-hidden">
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>

    <div class="container mx-auto px-6">
      <div class="max-w-4xl mx-auto">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div class="space-y-8">
            <div class="space-y-4">
              <h2 class="text-4xl font-black tracking-tighter text-white italic">
                VAMOS <span class="text-indigo-500">CONVERSAR?</span>
              </h2>
              <p class="text-slate-400 leading-relaxed">
                Interessado em colaborar em um projeto, tirar dúvidas sobre minha trajetória na UCS ou apenas dizer um "olá"? Sinta-se à vontade para me enviar uma mensagem.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-4 text-slate-300">
                <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                  <Mail size="18" />
                </div>
                <span class="text-sm font-medium">ruchecontato@gmail.com</span>
              </div>
              <div class="flex items-center gap-4 text-slate-300">
                <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                  <MessageSquare size="18" />
                </div>
                <span class="text-sm font-medium">Caxias do Sul, RS</span>
              </div>
            </div>
          </div>

          <div class="relative">
            <form @submit="onSubmit" class="space-y-5 p-8 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-md">
              
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Nome</label>
                <div class="relative">
                  <User class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size="18" />
                  <input v-model="nome" v-bind="nomeProps" type="text" placeholder="Seu nome"
                    class="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all" />
                </div>
                <span class="text-[10px] text-red-400 font-bold uppercase ml-1">{{ errors.nome }}</span>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">E-mail</label>
                <div class="relative">
                  <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size="18" />
                  <input v-model="email" v-bind="emailProps" type="email" placeholder="seu@email.com"
                    class="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all" />
                </div>
                <span class="text-[10px] text-red-400 font-bold uppercase ml-1">{{ errors.email }}</span>
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Mensagem</label>
                <textarea v-model="mensagem" v-bind="mensagemProps" rows="4" placeholder="Como posso ajudar?"
                  class="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all resize-none"></textarea>
                <span class="text-[10px] text-red-400 font-bold uppercase ml-1">{{ errors.mensagem }}</span>
              </div>

              <button type="submit" :disabled="isSubmitting"
                class="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                <Loader2 v-if="isSubmitting" class="animate-spin" size="20" />
                <template v-else>
                  Enviar Mensagem <Send size="18" />
                </template>
              </button>

              <div v-if="isSuccess" class="p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-emerald-400 text-sm text-center font-bold animate-in fade-in zoom-in">
                Mensagem enviada com sucesso!
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>