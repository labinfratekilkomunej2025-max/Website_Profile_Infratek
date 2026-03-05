<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Position extends Model
{
    protected $fillable = [
        'name',
        'division_id',
        'order'
    ];
    public $timestamps = false;
    public function members():HasMany{
        return $this->hasMany(Member::class);
    }
    public function division():BelongsTo
    {
        return $this->belongsTo(Division::class, 'division_id');
    }
}
