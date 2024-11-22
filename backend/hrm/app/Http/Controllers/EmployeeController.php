<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index() {
        return Employee::all();
    }
    
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees',
            'contact' => 'required|string|max:20',
        ]);
    
        return Employee::create(attributes: $validated);
    }
    

    public function update(Request $request, Employee $employee) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:employees,email,' . $employee->id,
            'contact' => 'required|string|max:20',
        ]);
        
        $employee->update($validated);
        return response()->json($employee); // Return the updated record
    }
    
    // public function update(Request $request, Employee $employee) {
    //     $employee->update($request->all());
    //     //return $employee;
    // }
    
    public function destroy(Employee $employee) {
        $employee->delete();
        return response()->json(null, 204);
    }
    
}
