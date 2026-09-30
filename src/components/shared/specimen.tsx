import { Concept } from "@/components/layout/concept";
import {
  proofForms,
  proofSizes,
  type LogoConcept,
  type proofTones,
} from "@/content/logo-concepts";

type Props = {
  concept: LogoConcept;
  tone: (typeof proofTones)[number];
  isLoading: boolean;
};

export function Specimen({ concept, tone, isLoading }: Props) {
  return (
    <section className="proof-panel" data-tone={tone.key}>
      <header className="proof-heading">
        <h3>{tone.label}</h3>
        <span>{tone.detail}</span>
      </header>
      {proofForms.map((form) => (
        <figure className="proof-form" key={form.key}>
          <figcaption>
            <span>{form.label}</span>
            <span>۲۵۶ پیکسل</span>
          </figcaption>
          <div className="proof-large" data-form={form.key}>
            <Concept
              concept={concept}
              form={form.key}
              tone={tone.key}
              size={256}
              isLoading={isLoading}
            />
          </div>
          <div className="proof-scales">
            {proofSizes.map((size) => (
              <div className="proof-scale" key={size.value}>
                <div className="proof-small" data-form={form.key}>
                  <Concept
                    concept={concept}
                    form={form.key}
                    tone={tone.key}
                    size={size.value}
                    isLoading={isLoading}
                  />
                </div>
                <span>{size.label} پیکسل</span>
              </div>
            ))}
          </div>
        </figure>
      ))}
    </section>
  );
}
