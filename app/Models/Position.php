<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Position extends Model
{
    protected $fillable = [
        'name',
        'division_id'
    ];
    public $timestamps = false;
    public function members():HasMany{
        return $this->hasMany(Member::class);
    }
    public function divisions():BelongsTo
    {
        return $this->belongsTo(Division::class);
    }
}
