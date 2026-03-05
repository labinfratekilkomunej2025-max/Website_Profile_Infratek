<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Enums\NewsCompType;    

class News extends Model
{
    protected $fillable = [
        'id',
        'title',
        'created_by_id',
        'edited_by_id',
        'created_at',
        'edited_at',
        'is_public',
        'description',
    ];
    public $timestamps = false;
    protected $casts = [
        'created_at' => 'datetime',
        'edited_at' => 'datetime',
    ];
    public function thumbnail():HasOne
    {
        return $this->hasOne(NewsComponent::class)
                    ->where('is_tumbnail', true);
    }
    public function editor():BelongsTo
    {
        return $this->belongsTo(User::class, 'edited_by_id', 'id');
    }
    public function creator():BelongsTo
    {
        return $this->belongsTo(User::class, "created_by_id", "id");
    }
    public function news_components():HasMany
    {
        return $this->hasMany(NewsComponent::class, 'id','news_id')
                    ->orderBy('order');
    }
    public function  images():HasMany
    {
        return $this->hasMany(NewsComponent::class, 'id','news_id')
                    ->orderBy('order')->where('type', 'image');
    }
}
