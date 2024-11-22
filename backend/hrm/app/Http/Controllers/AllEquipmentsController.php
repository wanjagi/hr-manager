<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\AllEquipments;

class AllEquipmentsController extends Controller
{
    //
    public function index() {
        return AllEquipments::all();
    }
    
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',
            'description' => 'required|string|max:255',
        ]);
    
        return AllEquipments::create(attributes: $validated);
    }
    
    // public function update(Request $request, AllEquipments $allEquipments) {
    //     $allEquipments->update($request->all());
    //     return $allEquipments;
    // }


    public function update(Request $request, allEquipments $allEquipments) {
        $validated = $request->validate([
            'name' => 'string',
            'serial_number' => 'string',
            'description' => 'string',
        ]);
        
        $allEquipments->update($validated);
        return response()->json($allEquipments); // Return the updated record
    }
    
    public function destroy(AllEquipments $allEquipments) {
        $allEquipments->delete();
        return response()->json(null, 204);
    }
}
