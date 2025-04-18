<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $contacts = Contact::query();
        if ($request->user()->role == 'user') {
            $contacts = $contacts->where('user_id', $request->user()->id);
        }
        $contacts = $contacts->get();
        return Inertia::render('contacts/index', ['contacts' => $contacts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('contacts/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'nullable|email|unique:contacts,email',
            'mobile' => 'required|regex:/^\+?[0-9\s\-\(\)]+$/|unique:contacts,mobile',
            'address' => 'nullable',
        ]);
        $validatedData['user_id'] = $request->user()->id;
        Contact::create($validatedData);

        return redirect()->route('contacts.index')->with('Success', 'Contact created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        return Inertia::render('contacts/edit', [
            'contact' => $contact,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'nullable|email|unique:contacts,email,' . $contact->id,
            'mobile' => 'required|regex:/^\+?[0-9\s\-\(\)]+$/|unique:contacts,mobile,' . $contact->id,
            'address' => 'nullable',
        ]);
        $contact->update($validatedData);

        return redirect()->route('contacts.index')->with('success', 'Contact updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('contacts.index')->with('success', 'Contact deleted successfully.');
    }
}
