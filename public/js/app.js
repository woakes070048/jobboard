

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
        updatejob: function (job) {
            this.$http.patch('/api/jobs/' + job.id, job)
            //Set editing to false to show actions again and hide the inputs
            job.editing = false;
        },
        storeJob: function (job) {
            this.$http.post('/api/jobs/', job).then(function (response) {
                /*
                 After the the new story is stored in the database fetch again all stories with
                 vm.fetchStories();
                 Or Better, update the id of the created story
                 */
                Vue.set(job, 'id', response.data.id);

                //Set editing to false to show actions again and hide the inputs
                job.editing = false;
            });
        },
    }
})

new Vue({
    el: '#v-app',
    data: {
        jobs: [],
    },
    ready: function () {
        this.fetchJobs()
    },
    methods: {
        createJob: function () {
            var newJob = {
                plot: "",
                upvotes: 0,
                editing: true
            };
            this.jobs.push(newJob);
        },
        fetchJobs: function (page_url) {
            var vm = this;
            page_url = page_url || '/api/jobs'
            this.$http.get(page_url)
                .then(function (response) {
                    var jobsReady = response.data.map(function (job) {
                        job.editing = false;
                        return job
                    })
                    vm.makePagination(response.data)
                    vm.$set('jobs', jobsReady)
                });
        },
        makePagination(data){
            //here we use response.data
            var pagination = {
                current_page: data.current_page,
                last_page: data.last_page,
                next_page_url: data.next_page_url,
                prev_page_url: data.prev_page_url
            }
            this.$set('pagination', pagination)
        }
    }
});