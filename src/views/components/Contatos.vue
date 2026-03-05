<script setup>
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import emailjs from '@emailjs/browser'
import { Send, Mail, MessageSquare, User, Loader2, CheckCircle2 } from 'lucide-vue-next'

// Componentes Shadcn/Vue
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const isSubmitting = ref(false)
const isSuccess = ref(false)

const formSchema = yup.object({
  nome: yup.string().required('Nome é obrigatório').min(3, 'Nome muito curto'),
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  mensagem: yup.string().required('A mensagem não pode estar vazia').min(10, 'Conte-me um pouco mais'),
})

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    nome: '',
    email: '',
    mensagem: ''
  }
})

const onSubmit = form.handleSubmit(async (values) => {
  isSubmitting.value = true
  try {
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

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
    form.resetForm()
    
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
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-0"></div>

    <div class="container mx-auto px-6 relative z-10">
      <div class="max-w-4xl mx-auto">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div class="space-y-8">
            <div class="space-y-6">
              <h2 class="text-5xl font-black tracking-tighter text-white italic uppercase leading-tight">
                VAMOS <br/>
                <span class="text-indigo-500">CONVERSAR?</span>
              </h2>
              <p class="text-slate-400 leading-relaxed text-lg">
                Interessado em colaborar em um projeto, tirar dúvidas sobre minha trajetória na UCS ou apenas dizer um "olá"? Sinta-se à vontade para enviar uma mensagem.
              </p>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-4 text-slate-300 group">
                <div class="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                  <Mail size="20" />
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-widest text-slate-500 font-bold">E-mail</p>
                  <p class="text-white font-medium">ruchecontato@gmail.com</p>
                </div>
              </div>

              <div class="flex items-center gap-4 text-slate-300 group">
                <div class="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                  <MessageSquare size="20" />
                </div>
                <div>
                  <p class="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Localização</p>
                  <p class="text-white font-medium">Caxias do Sul, RS</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <form @submit="onSubmit" class="space-y-5 p-8 bg-white/[0.02] border border-white/10 rounded-[2rem] backdrop-blur-md">
              
              <FormField v-slot="{ componentField }" name="nome">
                <FormItem class="space-y-1">
                  <FormLabel class="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Nome Completo</FormLabel>
                  <FormControl>
                    <div class="relative">
                      <User class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" :size="18" />
                      <Input 
                        v-bind="componentField" 
                        placeholder="Seu nome"
                        class="bg-black/40 border-white/10 py-6 pl-12 text-white placeholder:text-slate-700 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/50 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage class="text-[10px] font-bold text-red-400 uppercase" />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="email">
                <FormItem class="space-y-1">
                  <FormLabel class="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">E-mail</FormLabel>
                  <FormControl>
                    <div class="relative">
                      <Mail class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" :size="18" />
                      <Input 
                        v-bind="componentField" 
                        type="email"
                        placeholder="seu@email.com"
                        class="bg-black/40 border-white/10 py-6 pl-12 text-white placeholder:text-slate-700 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/50 rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage class="text-[10px] font-bold text-red-400 uppercase" />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="mensagem">
                <FormItem class="space-y-1">
                  <FormLabel class="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Sua Mensagem</FormLabel>
                  <FormControl>
                    <Textarea 
                      v-bind="componentField" 
                      placeholder="Como posso ajudar?" 
                      class="bg-black/40 border-white/10 min-h-[120px] text-white placeholder:text-slate-700 focus-visible:ring-indigo-500/20 focus-visible:border-indigo-500/50 rounded-xl resize-none"
                    />
                  </FormControl>
                  <FormMessage class="text-[10px] font-bold text-red-400 uppercase" />
                </FormItem>
              </FormField>

              <Button 
                type="submit" 
                :disabled="isSubmitting"
                class="w-full py-7 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 text-white font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
              >
                <Loader2 v-if="isSubmitting" class="animate-spin mr-2" :size="20" />
                <span v-else class="flex items-center gap-2">
                  Enviar Mensagem <Send :size="18" />
                </span>
              </Button>

              <transition name="fade">
                <div v-if="isSuccess" class="flex items-center justify-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-bold uppercase tracking-tight">
                  <CheckCircle2 :size="16" />
                  Mensagem enviada com sucesso!
                </div>
              </transition>

            </form>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>