
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

  Template.task.helpers({
  	tasks: function(){
      if (Session.get('showDone')){
        return Tasks.find({done: {$ne: true}}, {sort:{createdAt: -1}});
      } else {
        return Tasks.find({}, {sort: {createdAt: -1}});
      }
  	},
    show_undone: function(){
      return Session.get('showDone');
    }
  });

  Template.body.events({
  	'submit .new-task': function (evt) {
  		evt.preventDefault();

  		var txt = evt.target.tt.value;

  		Tasks.insert({
  			text: txt,
  			createdAt: new Date(),
  			done: false
  		});

  		evt.target.tt.value='';
  }
});

  Template.task.events({
  	'click .task_done': function(){
  		var d = !this.done;
  		Tasks.update(this._id, {$set: {done: d}});
  	},
  	'click .del': function(){
  		Tasks.remove(this._id);
  	},
    'change .undone': function(evt){
      Session.set('showDone', evt.target.checked);
    },
    'click .order_by': function(){
      // Tentative de tri par fait / pas fait
      Session.set('orderDone', !Session.get('orderDone'));
      console.log(Session.get('orderDone'));
    }
  });

}
