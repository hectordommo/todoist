<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Todo extends Model
{
    use HasFactory;
    protected $fillable = [
        'activity',
        'description',
    ];


    public function goal():HasOne {
        return $this->hasOne(Goal::class);
    }
    public function client():HasOne {
        return $this->hasOne(Client::class);
    }
    public function project():HasOne {
        return $this->hasOne(Project::class);
    }
}
