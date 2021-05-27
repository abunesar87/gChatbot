import ChatForm from './ChatForm'

Object.defineProperty(ChatForm, 'install', {
	configurable: true,
	enumerable: true,
	value(Vue) {
		Vue.component('ChatForm', ChatForm)
	}
})

export default ChatForm
