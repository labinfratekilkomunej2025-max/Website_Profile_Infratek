<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Division extends Model
{
    protected $fillable = [
        'name',
        'order',
    ];
    public $timestamps = false;
    public function positions():BelongsTo
    {
        return $this->belongsTo(Position::class);
    }
}
