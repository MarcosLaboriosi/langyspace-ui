import { useEffect } from 'react'
import {
  ActionLink,
  Button,
  IconButton,
  LoadingState,
  StatePanel,
  StatusChip,
} from '../src'
import { ContextTab } from './styles'
import type {
  ButtonSize,
  ButtonVariant,
  IconButtonVariant,
  StatusChipTone,
} from '../src'

const variants: ButtonVariant[] = [
  'primary',
  'secondary',
  'tertiary',
  'brand',
  'danger',
  'success',
  'inverse',
]
const iconButtonVariants: IconButtonVariant[] = [
  'neutral',
  'subtle',
  'brand',
  'success',
  'danger',
  'inverse',
]
const sizes: ButtonSize[] = ['sm', 'md', 'lg']
const statusTones: StatusChipTone[] = [
  'neutral',
  'info',
  'success',
  'warning',
  'danger',
  'brand',
]
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
        <p className="showcase__eyebrow">LANGY.SPACE UI · V1.0.0</p>
        <h1>Actions e Pressable</h1>
        <p>
          Componentes nativos e previsíveis para comandos, navegação com
          aparência de ação e controles específicos de domínio.
        </p>
      </header>
      <section aria-labelledby="variants-title" className="showcase__section">
        <div className="showcase__section-heading">
          <p>CONTRATO</p>
          <h2 id="variants-title">Variantes e tamanhos</h2>
        </div>
        <div className="showcase__variant-grid">
          {variants.map((variant) => (
            <article
              className={`showcase__card${variant === 'inverse' ? ' showcase__card--dark' : ''}`}
              key={variant}
            >
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
              <Button variant="brand">Nova matrícula</Button>
              <Button variant="danger">Excluir acesso</Button>
              <Button variant="success">Marcar presença</Button>
            </div>
          </article>
          <article className="showcase__card">
            <h3>Densidade compacta</h3>
            <div className="showcase__button-column">
              <Button density="compact" iconStart={ArrowIcon}>
                Remarcar aula
              </Button>
              <Button density="compact" variant="secondary">
                Aluno faltou
              </Button>
            </div>
          </article>
          <article className="showcase__card">
            <h3>Indisponível e loading</h3>
            <div className="showcase__button-column">
              <Button disabled>Indisponível</Button>
              <Button iconEnd={ArrowIcon} iconStart={ArrowIcon} isLoading>
                Guardando alterações
              </Button>
            </div>
          </article>
          <article className="showcase__card">
            <h3>Formas do IconButton</h3>
            <div className="showcase__button-row">
              <IconButton aria-label="Avançar em círculo">
                {ArrowIcon}
              </IconButton>
              <IconButton aria-label="Avançar arredondado" shape="rounded">
                {ArrowIcon}
              </IconButton>
            </div>
          </article>
          <article className="showcase__card">
            <h3>IconButton</h3>
            <div className="showcase__button-row">
              {sizes.map((size) => (
                <IconButton
                  aria-label={`Avançar ${size}`}
                  key={size}
                  size={size}
                >
                  {ArrowIcon}
                </IconButton>
              ))}
              <IconButton aria-label="Carregando" isLoading>
                {ArrowIcon}
              </IconButton>
            </div>
          </article>
          <article className="showcase__card">
            <h3>Semântica do IconButton</h3>
            <div className="showcase__button-row">
              {iconButtonVariants
                .filter((variant) => variant !== 'inverse')
                .map((variant) => (
                  <IconButton
                    aria-label={`IconButton ${variant}`}
                    key={variant}
                    variant={variant}
                  >
                    {ArrowIcon}
                  </IconButton>
                ))}
            </div>
          </article>
          <article className="showcase__card showcase__card--dark">
            <h3>Superfície escura</h3>
            <div className="showcase__button-row">
              <Button variant="inverse">Agora não</Button>
              <IconButton aria-label="Ver detalhes" variant="inverse">
                {ArrowIcon}
              </IconButton>
            </div>
          </article>
        </div>
      </section>
      <section aria-labelledby="links-title" className="showcase__section">
        <div className="showcase__section-heading">
          <p>NAVEGAÇÃO</p>
          <h2 id="links-title">Links com aparência de ação</h2>
        </div>
        <div className="showcase__state-grid">
          <article className="showcase__card">
            <h3>Hierarquia</h3>
            <div className="showcase__button-column">
              <ActionLink
                data-audit-link-focus
                href="#principal"
                iconEnd={ArrowIcon}
              >
                {standardLabel}
              </ActionLink>
              <ActionLink href="#secundaria" variant="secondary">
                Ação secundária
              </ActionLink>
              <ActionLink href="#terciaria" variant="tertiary">
                Ação terciária
              </ActionLink>
            </div>
          </article>
          <article className="showcase__narrow-card">
            <h3>Largura e marca</h3>
            <ActionLink fullWidth href="#marca" size="lg" variant="brand">
              {stressMode ? stressToken : 'Começar agora'}
            </ActionLink>
          </article>
        </div>
      </section>
      <section aria-labelledby="status-title" className="showcase__section">
        <div className="showcase__section-heading">
          <p>STATUS</p>
          <h2 id="status-title">Significado antes de cor</h2>
        </div>
        <article className="showcase__card">
          <h3>Tons semânticos</h3>
          <div className="showcase__status-row">
            {statusTones.map((tone) => (
              <StatusChip indicator key={tone} tone={tone}>
                {stressMode ? `${tone} · ${stressLabel}` : tone}
              </StatusChip>
            ))}
          </div>
        </article>
      </section>
      <section
        aria-labelledby="state-panels-title"
        className="showcase__section"
      >
        <div className="showcase__section-heading">
          <p>ESTADOS DE CONTEÚDO</p>
          <h2 id="state-panels-title">Painéis compostos</h2>
        </div>
        <div className="showcase__state-grid">
          <StatePanel
            description={
              stressMode
                ? stressLabel
                : 'Adicione o primeiro item para começar.'
            }
            state="empty"
            surface="dashed"
            title="Nenhum resultado"
          />
          <StatePanel
            action={<Button size="sm">Tentar novamente</Button>}
            description="Confira sua conexão e repita a operação."
            state="error"
            title="Não foi possível carregar"
          />
          <LoadingState
            description="Isso pode levar alguns segundos."
            title="Carregando conteúdo"
          />
          <StatePanel
            density="compact"
            state="partial"
            title="Parte dos resultados está disponível"
          />
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
            <ContextTab aria-pressed="true">Lições</ContextTab>
            <ContextTab aria-pressed="false">Vocabulário</ContextTab>
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
