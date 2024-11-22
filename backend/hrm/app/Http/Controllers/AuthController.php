<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);
        $fields['role'] = 'employee'; 

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'role' => $fields['role']
        ]);
        //add token

        $token = $user->createToken('myapptoken')->plainTextToken;
        //add response

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
        //->json(['message' => 'User registered successfully']);
    }



    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
        ]);

        //check email
        $user = User::where('email', $fields['email'])->first();
        
        //check password
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => 'wrong login details'
            ],401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;
        //add response

        $response = [
            'user' => $user,
            'token' => $token,
        ];

        return response($response, 201);
        //->json(['message' => 'User registered successfully']);
    }


    /*public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json(['token' => $token]);
    }*/


    public function logout(Request $request)
    {
        
        auth()->user()->tokens()->delete();
        
        $response = [
            'message' => 'unauthenticated'
        ];
        return response($response);
        
        /*$user = $request->user();
        
        if ($user) {
            $user->tokens()->delete();  // Delete all tokens if you want to log out all devices
            return response()->json(['success' => 'Logged out successfully']);
        }
        return response()->json(['failure' => 'User not found'], 404);*/
    }

    public function index(Request $request){
        return User::all();
    }

    public function store(Request $request){
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);
        $fields['role'] = 'employee'; 

        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
            'role' => $fields['role']
        ]);

        $response = [
            'user' => $user,
        ];

        return response($response, 201);
    
    }


    public function update(Request $request, User $user){
        $user -> update($request->all());
    }


    public function destroy(Request $request, User $user){
        $user->delete();
    }

}
