<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Equipment;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function index()
    {
        $equipment = Equipment::with('employee')->get();
        return response()->json(['data' => $equipment]);
    }
    
    public function store(Request $request)
    {
        // Validate incoming request data
        $validatedData = $request->validate([
            'employee_name' => 'required|string',
            'equipment_name' => 'required|string',
        ]);

        // Find the employee by name (or ID, if preferred)
        $employee = Employee::where('name', $validatedData['employee_name'])->first();

        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        //find if product already exixsts
        $IsEquip = Equipment::where('equipment_name', $validatedData['equipment_name'])->first();
        if ($IsEquip){
            return response()->json(['message'=>'equipment already issued'], status:404);
        }

        // Create the equipment record
        $equipment = Equipment::create([
            'employee_id' => $employee->id,
            'equipment_name' => $validatedData['equipment_name']
        ]);

        // Return a success response
        return response()->json(['data' => $equipment, 'message' => 'Equipment issued successfully'], 201);
    }
    
    
    public function update(Request $request, Equipment $equipment) {
        $equipment->update($request->all());
        return $equipment;
    }
    
    public function destroy(Equipment $equipment) {
        $equipment->delete();
        return response()->json(null, 204);
    }
    
}
