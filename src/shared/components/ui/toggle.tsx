"use client";

import React from "react";

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export const Toggle = ({ checked, onChange, disabled = false }: ToggleProps) => (
  <button 
    type="button"
    onClick={onChange}
    disabled={disabled}
    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 focus:ring-offset-dark-900 ${checked ? 'bg-accent-purple' : 'bg-dark-600'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
  </button>
);
