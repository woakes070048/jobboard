<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = ['reference',  'title', 'type', 'description', 'employer', 'location', 'salary', 'post_date'  ];

    /**
     * Search for a job using the Jobs Api.
     *
     * @param $id
     * @return mixed
     */
    public static function findOrAbort($id){
        if (!$job = Job::find($id)) {
            $error = [
                'error' => [
                    'code' => 'ERR-NOTFOUND',
                    'http_code' => '404',
                    'message' => 'Requested story cannot be found in the database.',
                ]
            ];
            return \Response::json($error, 404);
        }
        return $job;
    }
}
