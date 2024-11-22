<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IssuedEquipment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id', 'equipment_id', 'status'
    ];
}
