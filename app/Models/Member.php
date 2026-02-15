<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Member extends Model
{
    protected $fillable = [
        'full_name',
        'position_id',
        'photo_path',
        'created_at',
        'edited_at',
    ];
    protected $casts = [
        'created_at' => 'datetime',
        'edited_at' => 'datetime',
    ];
    public function position():BelongsTo
    {
        return $this->belongsTo(Position::class);
    }
    public function management_detail():HasOne
    {
        return $this->hasOne(ManagementDetail::class);
    }
}
