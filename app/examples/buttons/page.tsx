import { Button } from "@/components/atoms/button";
import { Plus } from "lucide-react";

export default function ButtonExamplesPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Button Components</h1>
          <p className="text-muted-foreground">
            Ejemplos de botones basados en el diseño de Figma
          </p>
        </div>

        {/* Primary Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Primary Buttons</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                Size: Small (Default)
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  hierarchy="primary"
                  size="sm"
                  iconLeading={<Plus className="size-5" />}
                  iconTrailing={<Plus className="size-5" />}
                >
                  Button CTA
                </Button>
                <Button
                  hierarchy="primary"
                  size="sm"
                  iconLeading={<Plus className="size-5" />}
                >
                  With Left Icon
                </Button>
                <Button hierarchy="primary" size="sm">
                  No Icons
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                Size: Medium
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  hierarchy="primary"
                  size="md"
                  iconLeading={<Plus className="size-5" />}
                  iconTrailing={<Plus className="size-5" />}
                >
                  Button CTA
                </Button>
                <Button
                  hierarchy="primary"
                  size="md"
                  iconLeading={<Plus className="size-5" />}
                >
                  With Left Icon
                </Button>
                <Button hierarchy="primary" size="md">
                  No Icons
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                Type: Error
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  hierarchy="primary"
                  size="sm"
                  state="error"
                  iconLeading={<Plus className="size-5" />}
                  iconTrailing={<Plus className="size-5" />}
                >
                  Error Button
                </Button>
                <Button
                  hierarchy="primary"
                  size="md"
                  state="error"
                  iconLeading={<Plus className="size-5" />}
                >
                  Error Medium
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Secondary Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Secondary Buttons</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                Size: Small
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  hierarchy="secondary"
                  size="sm"
                  iconLeading={<Plus className="size-5" />}
                  iconTrailing={<Plus className="size-5" />}
                >
                  Button CTA
                </Button>
                <Button
                  hierarchy="secondary"
                  size="sm"
                  iconLeading={<Plus className="size-5" />}
                >
                  With Left Icon
                </Button>
                <Button hierarchy="secondary" size="sm">
                  No Icons
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                Size: Medium
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  hierarchy="secondary"
                  size="md"
                  iconLeading={<Plus className="size-5" />}
                  iconTrailing={<Plus className="size-5" />}
                >
                  Button CTA
                </Button>
                <Button
                  hierarchy="secondary"
                  size="md"
                  iconLeading={<Plus className="size-5" />}
                >
                  With Left Icon
                </Button>
                <Button hierarchy="secondary" size="md">
                  No Icons
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                State: Active
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  hierarchy="secondary-active"
                  size="sm"
                  iconLeading={<Plus className="size-5" />}
                  iconTrailing={<Plus className="size-5" />}
                >
                  Active State
                </Button>
                <Button
                  hierarchy="secondary-active"
                  size="md"
                  iconLeading={<Plus className="size-5" />}
                >
                  Active Medium
                </Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                Icon Only
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  hierarchy="secondary"
                  size="icon-sm"
                  iconLeading={<Plus className="size-5" />}
                />
                <Button
                  hierarchy="secondary-active"
                  size="icon-sm"
                  iconLeading={<Plus className="size-5" />}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Dark Mode Preview */}
        <section className="space-y-6 bg-[#001414] p-8 rounded-lg">
          <h2 className="text-2xl font-semibold text-white">Dark Mode</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-3 text-gray-400">
                Secondary Buttons - Dark Theme
              </h3>
              <div className="flex flex-wrap gap-4 dark">
                <Button
                  hierarchy="secondary"
                  size="sm"
                  iconLeading={<Plus className="size-5" />}
                  iconTrailing={<Plus className="size-5" />}
                >
                  Button CTA
                </Button>
                <Button
                  hierarchy="secondary"
                  size="md"
                  iconLeading={<Plus className="size-5" />}
                >
                  Medium Size
                </Button>
                <Button
                  hierarchy="secondary-active"
                  size="sm"
                  iconLeading={<Plus className="size-5" />}
                >
                  Active State
                </Button>
                <Button
                  hierarchy="secondary"
                  size="icon-sm"
                  iconLeading={<Plus className="size-5" />}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interactive States Demo */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Interactive States</h2>
          <p className="text-sm text-muted-foreground">
            Hover y focus states están implementados automáticamente
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              hierarchy="primary"
              size="md"
              iconLeading={<Plus className="size-5" />}
            >
              Hover Me (Primary)
            </Button>
            <Button
              hierarchy="secondary"
              size="md"
              iconLeading={<Plus className="size-5" />}
            >
              Hover Me (Secondary)
            </Button>
            <Button
              hierarchy="primary"
              size="md"
              state="error"
              iconLeading={<Plus className="size-5" />}
            >
              Hover Me (Error)
            </Button>
          </div>
        </section>

        {/* Code Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Usage Examples</h2>
          <div className="bg-neutral-900 text-neutral-0 p-6 rounded-lg font-mono text-sm space-y-4">
            <div>
              <p className="text-gray-400 mb-2">{`// Primary button with icons`}</p>
              <code className="text-green-400">
                {`<Button
  hierarchy="primary"
  size="md"
  iconLeading={<Plus />}
  iconTrailing={<Plus />}
>
  Button CTA
</Button>`}
              </code>
            </div>

            <div>
              <p className="text-gray-400 mb-2">{`// Secondary button`}</p>
              <code className="text-green-400">
                {`<Button
  hierarchy="secondary"
  size="sm"
  iconLeading={<Plus />}
>
  Button CTA
</Button>`}
              </code>
            </div>

            <div>
              <p className="text-gray-400 mb-2">{`// Icon only button`}</p>
              <code className="text-green-400">
                {`<Button
  hierarchy="secondary"
  size="icon-sm"
  iconLeading={<Plus />}
/>`}
              </code>
            </div>

            <div>
              <p className="text-gray-400 mb-2">{`// Error button`}</p>
              <code className="text-green-400">
                {`<Button
  hierarchy="primary"
  size="md"
  type="error"
>
  Delete Item
</Button>`}
              </code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
