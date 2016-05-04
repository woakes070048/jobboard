<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\User::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->safeEmail,
        'password' => bcrypt(str_random(10)),
        'remember_token' => str_random(10),
    ];

});

$factory->define(App\Job::class, function (Faker\Generator $faker) {
  return [
    'reference' => $faker->domainWord,
    'employer' => $faker->company,
    'title' => $faker->jobTitle,
    'location' => $faker->city,
    'salary' => $faker->numberBetween($min = 1000, $max = 9000),
    'post_date' => $faker->dateTimeBetween($startDate = '-30 years', $endDate = 'now', $timezone = date_default_timezone_get()),
     'type' => $faker->jobTitle,
     'description' => $faker->paragraph
  ];
});