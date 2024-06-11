<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Todo extends Model
{
    use HasFactory;
    protected $fillable = [
        'activity',
        'description',
    ];


    public function goal():BelongsTo {
        return $this->belongsTo(Goal::class);
    }
    public function client():BelongsTo {
        return $this->belongsTo(Client::class);
    }
    public function project():BelongsTo {
        return $this->belongsTo(Project::class);
    }

    protected function casts(): array
    {
        return [
            'completed' => 'boolean',
            'completed_at' => 'date'
        ];
    }
}
