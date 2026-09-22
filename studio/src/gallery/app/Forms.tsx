import { useState, type FormEvent } from "react";
import { useGallery } from "@/gallery/context";
import { Button, Checkbox, Input, Select, Switch, cn } from "@/ui";

const BUTTON_VARIANTS = ["primary", "secondary", "ghost", "outline", "destructive", "link"] as const;
const BUTTON_SIZES = ["sm", "md", "lg"] as const;

export function Forms() {
  const { choices, content } = useGallery();
  const [values, setValues] = useState<Record<number, string | boolean>>({});

  const setValue = (index: number, value: string | boolean) => {
    setValues((current) => ({ ...current, [index]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();

  const buttonCopy = [
    content.app.form.submit,
    content.app.form.cancel,
    content.app.page.action,
    content.app.empty.action,
    content.app.dialog.confirm,
    content.app.error.action,
  ];
  const cardClasses =
    choices.cards === "fill" ? "bg-muted" : "border border-border-card bg-card shadow-md";
  const inputClasses =
    choices.inputs === "filled"
      ? "!border-transparent !bg-muted !shadow-none"
      : choices.inputs === "underline"
        ? "!rounded-none !border-0 !border-b !border-input !bg-transparent !shadow-none"
        : "!border-input !bg-background";
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";
  const cancelVariant = choices.buttons === "outline" ? "outline" : "ghost";

  return (
    <div className="space-y-4">
      <form
        onSubmit={submit}
        className={cn("overflow-hidden rounded-lg text-card-foreground", cardClasses)}
      >
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-medium text-foreground">{content.app.form.title}</h2>
        </div>

        <div className="space-y-4 px-5 py-5">
          {content.app.form.fields.map((field, index) => {
            if (field.kind === "switch") {
              return (
                <Switch
                  key={`${field.label}-${index}`}
                  checked={Boolean(values[index])}
                  onChange={(checked) => setValue(index, checked)}
                  label={field.label}
                />
              );
            }

            if (field.kind === "checkbox") {
              return (
                <Checkbox
                  key={`${field.label}-${index}`}
                  checked={Boolean(values[index])}
                  onChange={(checked) => setValue(index, checked)}
                  label={field.label}
                />
              );
            }

            return (
              <label key={`${field.label}-${index}`} className="block space-y-1.5 text-chrome text-foreground">
                <span className="font-medium">{field.label}</span>
                {field.kind === "select" ? (
                  <Select
                    options={field.options ?? []}
                    value={typeof values[index] === "string" ? values[index] : undefined}
                    onChange={(value) => setValue(index, value)}
                    placeholder={field.placeholder}
                    className={cn("w-full", inputClasses)}
                  />
                ) : (
                  <Input
                    value={typeof values[index] === "string" ? values[index] : ""}
                    onChange={(event) => setValue(index, event.target.value)}
                    placeholder={field.placeholder}
                    className={cn("w-full", inputClasses)}
                  />
                )}
              </label>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/50 px-5 py-3">
          <Button type="button" variant={cancelVariant}>
            {content.app.form.cancel}
          </Button>
          <Button type="submit" variant={primaryVariant}>
            {content.app.form.submit}
          </Button>
        </div>
      </form>

      <div className={cn("rounded-lg p-4", cardClasses)}>
        <div className="grid grid-cols-3 items-center gap-2">
          {BUTTON_VARIANTS.flatMap((variant, variantIndex) =>
            BUTTON_SIZES.map((size) => (
              <Button key={`${variant}-${size}`} type="button" variant={variant} size={size}>
                {buttonCopy[variantIndex]}
              </Button>
            )),
          )}
        </div>
        <div className="mt-3">
          <Button type="button" variant="primary" disabled>
            {content.app.form.submit}
          </Button>
        </div>
      </div>
    </div>
  );
}
