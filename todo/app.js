var data = {
    list: [],
    todo:'',// 将要添加到list的项
    editTodoItem:'',//当前正在编辑的项
    hashchange: 'all',
    filteredList: [],
    options: [1,2,3,4,5]
},
storage = {
	save(key, value) {
		localStorage.setItem(key,JSON.stringify(value));
	},
	get(key) {
		return JSON.parse(localStorage.getItem(key));
	}
},
hashChangeHandler = {
	all: function() {
		return this.list;
	},
	finished: function() {
		return this.list.filter(function(item) {
			return item.isChecked;
		});
	},
	notfinished: function() {
        return this.list.filter(function(item) {
			return !item.isChecked;
		});
	}
};

data.list = storage.get('todoList') ? storage.get('todoList') : [];

Vue.component('child',{
	props: ['myMessage'],
	template: '<span>{{myMessage}}</span>'
});

Vue.component('custom-select',{
	template:`<select name="" id="">
        	<option value="" v-for='op in options'>{{op}}</option> 
    	</select>`,
    props: ['options']
});
var vue = new Vue({
    el: '.main',
    data: data,
    methods: {
    	addTodoList() {
    		this.list.push({
    			       content: this.todo,
    			       isChecked: false
    		       });
    		this.todo = '';
    	},
    	deleteTodo(item) {
        	var index = this.list.indexOf(item);
        	this.list.splice(index,1);
    	},
    	editTodo(item) {
    		this.editTodoItem = item;
    		// 记录将要编辑的数据的内容，按ecs键撤销编辑时用
    		this.todoItemContentBeforeEdit = item.content;
    	},
    	editFinished() {
    		this.editTodoItem = '';
    	},
    	cancelEdit(item) {
    		item.content = this.todoItemContentBeforeEdit;
    		this.todoItemContentBeforeEdit = '';
    		this.editTodoItem = '';
    	}
    },
    computed: {
    	notFinishedListLength: function() {
    		return this.list.filter(function(item) {
    			return !item.isChecked;
    		}).length;
    	}
    },
    directives: {
    	focus: {
    		update(el,binding) {
            	if(binding.value) {
            		el.focus();
            	}
    		}
    	}
    },
    watch: {
    	list: {
    		handler: function() {
    			storage.save('todoList',this.list);	
    		},
    		deep: true
    	}, 
        hashchange: {
        	handler: function() {
        		console.log(this.hashchange);
        		this.filteredList = hashChangeHandler[this.hashchange] ? hashChangeHandler[this.hashchange].call(this) : this.list;	
    		}
        }
    }
});

window.addEventListener('hashchange',function() {
	vue.hashchange = window.location.hash.slice(1);
});