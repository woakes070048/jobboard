

Vue.component('job', {
    template: '#template-job-raw',
    props: ['job'],
    methods: {
        deleteJob: function (job) {
            this.$parent.jobs.$remove(job)
            this.$http.delete('/api/jobs/' + job.id)
        },
        editJob: function (job) {
            job.editing = true;
        },
        updateJob: function (job) {
            this.$http.patch('/api/jobs/' + job.id, job)
            //Set editing to false to show actions again and hide the inputs
            job.editing = false;
        },
        storeJob: function (job) {
            this.$http.post('/api/jobs/', job).then(function (response) {
                /*
                 After the the new job is stored in the database fetch again all jobs with
                 vm.fetchJobs();
                 Or Better, update the id of the created job
                 */
                Vue.set(job, 'id', response.data.id);

                //Set editing to false to show actions again and hide the inputs
                job.editing = false;
            });
        },
    }   
    
});




new Vue({
    el: '#v-app',
    data: {
        jobs: [],
    },
    ready: function () {
        this.fetchJobs()
    },
    methods: {
        createJob: function() {
          var newJob = {
                reference: "",
                title: "",
                type: "",
                description: "",
                employer: "",
                location: "",
                salary: "",
                editing: true
          };  
            this.jobs.push(newJob);
        },
        fetchJobs: function () {
            var vm = this;
            this.$http.get('/api/jobs')
                .then(function (response) {
                    // set data on vm
                    var jobsReady = response.data.map(function (job) {
                        job.editing = false;
                        return job
                    })
                    vm.$set('jobs', jobsReady)
                });
            }
        }

    });