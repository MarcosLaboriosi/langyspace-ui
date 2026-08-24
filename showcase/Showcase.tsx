import { useEffect } from 'react'
import { Button } from '../src'
import * as Styled from './styles'
import type { ButtonSize, ButtonVariant } from '../src'

const variants: ButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'success',
]
const sizes: ButtonSize[] = ['sm', 'md', 'lg']
const stressLabel =
  'Continuar com a configuração compartilhada de componentes Langy.space em todos os produtos'
const stressToken =
  'acaoprincipalcompartilhadaextremamentelongasemespaços000000000000000000000000000000000000'

const ArrowIcon = (
  <svg
    aria-hidden="true"
    fill="none"
    height="18"
    viewBox="0 0 18 18"
    width="18"
  >
    <path
      d="M3 9h12M10 4l5 5-5 5"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
)

export function Showcase() {
  const stressMode =
    new URLSearchParams(window.location.search).get('stress') === '1'
  const standardLabel = stressMode ? stressLabel : 'Continuar'

  useEffect(() => {
    document.querySelector<HTMLButtonElement>('[data-audit-focus]')?.focus()
  }, [])

  return (
    <main
      className="showcase"
      data-audit-mode={stressMode ? 'stress' : 'normal'}
    >
      <header className="showcase__header">
        <p className="showcase__eyebrow">LANGY.SPACE UI · V0.5.0</p>
        <h1>Button e Pressable</h1>
        <p>
          Um componente nativo, pequeno e previsível para ações principais,
          secundárias, terciárias, destrutivas e de conclusão, com uma base
          explícita para controles de domínio.
        </p>
      </header>
      <section aria-labelledby="variants-title" className="showcase__section">
        <div className="showcase__section-heading">
          <p>CONTRATO</p>
          <h2 id="variants-title">Variantes e tamanhos</h2>
        </div>
        <div className="showcase__variant-grid">
          {variants.map((variant) => (
            <article className="showcase__card" key={variant}>
              <h3>{variant}</h3>
              <div className="showcase__button-column">
                {sizes.map((size) => (
                  <Button key={size} size={size} variant={variant}>
                    {standardLabel} · {size}
                  </Button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section aria-labelledby="states-title" className="showcase__section">
        <div className="showcase__section-heading">
          <p>ESTADOS</p>
          <h2 id="states-title">Comportamento explícito</h2>
        </div>
        <div className="showcase__state-grid">
          <article className="showcase__card">
            <h3>Ícone e foco</h3>
            <div className="showcase__button-column">
              <Button data-audit-focus iconEnd={ArrowIcon}>
                {standardLabel}
              </Button>
              <Button iconStart={ArrowIcon} variant="secondary">
                Voltar uma etapa
              </Button>
            </div>
          </article>
          <article className="showcase__card">
            <h3>Semântica transversal</h3>
            <div className="showcase__button-column">
              <Button tone="brand">Nova matrícula</Button>
              <Button variant="danger">Excluir acesso</Button>
              <Button variant="success">Marcar presença</Button>
            </div>
          </article>
          <article className="showcase__card">
            <h3>Indisponível e loading</h3>
            <div className="showcase__button-column">
              <Button disabled>Indisponível</Button>
              <Button iconEnd={ArrowIcon} isLoading>
                Guardando alterações
              </Button>
            </div>
          </article>
          <article className="showcase__card">
            <h3>Forma arredondada</h3>
            <div className="showcase__button-column">
              <Button shape="rounded">Continuar</Button>
              <Button shape="rounded" variant="secondary">
                Cancelar
              </Button>
              <Button aria-label="Avançar" iconOnly shape="rounded">
                {ArrowIcon}
              </Button>
            </div>
          </article>
          <article className="showcase__card">
            <h3>Somente ícone</h3>
            <div className="showcase__button-row">
              {sizes.map((size) => (
                <Button
                  aria-label={`Avançar ${size}`}
                  iconOnly
                  key={size}
                  size={size}
                >
                  {ArrowIcon}
                </Button>
              ))}
              <Button aria-label="Avançar" iconOnly variant="secondary">
                {ArrowIcon}
              </Button>
              <Button aria-label="Carregando" iconOnly isLoading>
                {ArrowIcon}
              </Button>
            </div>
          </article>
          <article className="showcase__card showcase__card--dark">
            <h3>Superfície escura</h3>
            <div className="showcase__button-column">
              <Styled.DarkTertiaryButton variant="tertiary">
                Agora não
              </Styled.DarkTertiaryButton>
              <Styled.DarkTertiaryButton variant="tertiary">
                Ver detalhes
              </Styled.DarkTertiaryButton>
            </div>
          </article>
        </div>
      </section>
      <section aria-labelledby="pressable-title" className="showcase__section">
        <div className="showcase__section-heading">
          <p>COMPOSIÇÃO</p>
          <h2 id="pressable-title">Controle específico</h2>
        </div>
        <article className="showcase__card">
          <h3>Tabs locais sobre Pressable</h3>
          <div
            className="showcase__button-row"
            role="group"
            aria-label="Conteúdo da aula"
          >
            <Styled.ContextTab aria-pressed="true">Lições</Styled.ContextTab>
            <Styled.ContextTab aria-pressed="false">
              Vocabulário
            </Styled.ContextTab>
          </div>
        </article>
      </section>
      <section
        aria-labelledby="containment-title"
        className="showcase__section"
      >
        <div className="showcase__section-heading">
          <p>CONTENÇÃO</p>
          <h2 id="containment-title">Largura e conteúdo extremo</h2>
        </div>
        <article className="showcase__narrow-card">
          <Button fullWidth iconEnd={ArrowIcon} size="lg">
            {stressMode ? stressToken : 'Ação principal em largura total'}
          </Button>
        </article>
      </section>
    </main>
  )
}
