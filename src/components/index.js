import ChatForm from './ChatForm'

Object.defineProperty(ChatForm, 'install', {
	configurable: false,
	enumerable: false,
	value(Vue) {
		Vue.component('ChatForm', ChatForm)
	}
})

export default ChatForm
