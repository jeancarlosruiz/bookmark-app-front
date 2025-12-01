"use client";

import { Input } from "@/components/atoms/input";
import { Search, Mail, Lock, User } from "lucide-react";

export default function InputExamplesPage() {

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Input Components</h1>
          <p className="text-muted-foreground">
            Ejemplos de inputs basados en el diseño de Figma
          </p>
        </div>

        {/* Basic Inputs */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Basic Inputs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                With Label & Required
              </h3>
              <Input
                label="URL"
                required
                placeholder="Search"
                iconLeading={<Search className="size-5" />}
                hintText="This is a hint text to help user."
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                Email Input
              </h3>
              <Input
                label="Email"
                type="email"
                required
                placeholder="Enter your email"
                iconLeading={<Mail className="size-5" />}
                hintText="We'll never share your email."
              />
            </div>
          </div>
        </section>

        {/* Different States */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive States</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                Default State
              </h3>
              <Input
                label="Username"
                placeholder="Enter username"
                iconLeading={<User className="size-5" />}
                hintText="Choose a unique username."
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                Focus State (click inside)
              </h3>
              <Input
                label="Password"
                type="password"
                required
                placeholder="Enter password"
                iconLeading={<Lock className="size-5" />}
                hintText="Must be at least 8 characters."
              />
            </div>
          </div>
        </section>

        {/* Error State */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Error State</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                With Error Message
              </h3>
              <Input
                label="Email"
                type="email"
                required
                placeholder="email@example.com"
                iconLeading={<Mail className="size-5" />}
                error="Please enter a valid email address."
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                With Boolean Error
              </h3>
              <Input
                label="Username"
                required
                placeholder="username"
                iconLeading={<User className="size-5" />}
                error={true}
                hintText="This username is already taken."
              />
            </div>
          </div>
        </section>

        {/* Without Icons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Without Icons</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                Simple Input
              </h3>
              <Input
                label="Full Name"
                required
                placeholder="John Doe"
                hintText="Enter your first and last name."
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                No Label
              </h3>
              <Input
                placeholder="Type something..."
                hintText="This input has no label."
              />
            </div>
          </div>
        </section>

        {/* Different Input Types */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Different Input Types</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                Search Input
              </h3>
              <Input
                type="search"
                label="Search"
                placeholder="Search bookmarks..."
                iconLeading={<Search className="size-5" />}
                hintText="Search by title, URL, or tags."
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                URL Input
              </h3>
              <Input
                type="url"
                label="Website"
                required
                placeholder="https://example.com"
                hintText="Enter a valid URL."
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                Number Input
              </h3>
              <Input
                type="number"
                label="Age"
                placeholder="25"
                hintText="Must be 18 or older."
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                Date Input
              </h3>
              <Input
                type="date"
                label="Birth Date"
                required
                hintText="Select your date of birth."
              />
            </div>
          </div>
        </section>

        {/* Disabled State */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Disabled State</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                Disabled Input
              </h3>
              <Input
                label="Disabled Field"
                placeholder="Cannot edit this"
                iconLeading={<Lock className="size-5" />}
                hintText="This field is disabled."
                disabled
              />
            </div>

            <div>
              <h3 className="text-sm font-medium mb-4 text-muted-foreground">
                Disabled with Value
              </h3>
              <Input
                label="Read Only"
                value="This value cannot be changed"
                iconLeading={<Lock className="size-5" />}
                hintText="Read-only field."
                disabled
              />
            </div>
          </div>
        </section>

        {/* Dark Mode Preview */}
        <section className="space-y-6 bg-[#001414] p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-white">Dark Mode</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dark">
              <h3 className="text-sm font-medium mb-4 text-gray-400">
                Default Dark
              </h3>
              <Input
                label="URL"
                required
                placeholder="Search"
                iconLeading={<Search className="size-5" />}
                hintText="This is a hint text to help user."
              />
            </div>

            <div className="dark">
              <h3 className="text-sm font-medium mb-4 text-gray-400">
                Error Dark
              </h3>
              <Input
                label="Email"
                type="email"
                required
                placeholder="email@example.com"
                iconLeading={<Mail className="size-5" />}
                error="Invalid email address."
              />
            </div>

            <div className="dark">
              <h3 className="text-sm font-medium mb-4 text-gray-400">
                Without Icon
              </h3>
              <Input
                label="Username"
                required
                placeholder="username"
                hintText="Choose a unique username."
              />
            </div>

            <div className="dark">
              <h3 className="text-sm font-medium mb-4 text-gray-400">
                Disabled Dark
              </h3>
              <Input
                label="Disabled"
                placeholder="Cannot edit"
                iconLeading={<Lock className="size-5" />}
                hintText="This field is disabled."
                disabled
              />
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Usage Examples</h2>
          <div className="bg-neutral-900 text-neutral-0 p-6 rounded-lg font-mono text-sm space-y-4">
            <div>
              <p className="text-gray-400 mb-2">{`// Basic input with label`}</p>
              <code className="text-green-400">
                {`<Input
  label="URL"
  required
  placeholder="Search"
  iconLeading={<Search />}
  hintText="This is a hint text to help user."
/>`}
              </code>
            </div>

            <div>
              <p className="text-gray-400 mb-2">{`// Input with error`}</p>
              <code className="text-green-400">
                {`<Input
  label="Email"
  type="email"
  required
  placeholder="email@example.com"
  error="Please enter a valid email address."
/>`}
              </code>
            </div>

            <div>
              <p className="text-gray-400 mb-2">{`// Simple input without icon`}</p>
              <code className="text-green-400">
                {`<Input
  label="Full Name"
  placeholder="John Doe"
  hintText="Enter your full name."
/>`}
              </code>
            </div>

            <div>
              <p className="text-gray-400 mb-2">
                {`// Boolean error with hint text`}
              </p>
              <code className="text-green-400">
                {`<Input
  label="Username"
  required
  placeholder="username"
  error={true}
  hintText="This username is already taken."
/>`}
              </code>
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Features</h2>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Automatic ID generation from label</li>
            <li>Label and required indicator support</li>
            <li>Optional leading icon</li>
            <li>Hint text and error message support</li>
            <li>Full dark mode support with automatic theme switching</li>
            <li>
              Hover, focus, and error states with smooth transitions
            </li>
            <li>Accessible with proper ARIA attributes</li>
            <li>Supports all native input types</li>
            <li>Disabled state support</li>
            <li>Uses design system CSS variables</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
