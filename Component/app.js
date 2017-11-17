var data = {
	items: [1,2,3]
}

Vue.component('my-modal',{
	template:`
		<div class="modal layout">
			<div class="title">{{title}}</div>
			<div class="content">
				<slot name="content">
				内容区
				</slot>
			</div>
			<div class="btn-area">
				<slot name="ok">
					<span class="btn ok" v-on:click="click(1)">确定</span>
				</slot>
				<slot name="cancel">
					<span class="btn cancel" v-on:click="click(2)">取消</span>
				</slot>
				<slot></slot> 
			</div>
		</div>
	`,
	props:{
		title: {
			type: String,
			default: 'this is a modal popwin'
		}
	},	
	methods: {
		click(t) {  
			this.$emit('myclick',t);
		},
		cancel() {
			this.$emit('cancel','cancel');
		},
		back() {
			this.$emit('back','cancel');
		}
	}
});

new Vue({
	el: '.container',
	data: data,
	methods: {
		sure(flag) {
			alert(flag); 
		},
		cancel(flag) {
			alert(flag); 
		},
		back(flag) {
			alert(flag); 
		},
		myclick(flag){
			alert(flag); 
		}
	}
});