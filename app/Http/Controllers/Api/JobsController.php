<?php

namespace App\Http\Controllers\Api;

use App\Job;
use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class JobsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $jobs= Job::all();

        return $jobs;

    }

    /**
     * Display the specified Job.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Job::findOrAbort($id);

    }


    /**
     * Store a newly created Job in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $job = new Job($request->all());
        $job->save();
        return $job;
    }




    /**
     * Update the specified Job in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $job = Job::findOrAbort($id);

        $job->fill($request->only(['reference', 'employer', 'title', 'location', 'salary', 'post_date', 'type', 'description']));

        $job->save();

        return $job;
    }

    /**
     * Remove the specified job from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $job = Job::findOrAbort($id);
        $job->delete();

        return \Response::json(['success' => true]);
    }
}
