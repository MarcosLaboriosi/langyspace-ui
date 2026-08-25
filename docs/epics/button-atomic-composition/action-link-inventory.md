# Inventário de links de ação

Classificação feita imediatamente antes da adoção do `ActionLink`. Links editoriais, legais,
sociais e controles icon-only não são botões visuais e permanecem locais.

| Produto | Superfície                                  | Decisão             | Motivo                                                 |
| ------- | ------------------------------------------- | ------------------- | ------------------------------------------------------ |
| Landing | Header `NavLink`                            | migrar              | recipe de primary/secondary, size sm e label           |
| Landing | English Classes `Action`                    | migrar              | CTA primary lg canônico                                |
| Landing | Final CTA `Action`                          | migrar              | CTA brand lg; diferenças sutis convergem ao recipe     |
| Landing | Sticky mobile `Action`                      | migrar              | CTA brand lg full width; posição continua no container |
| Landing | Not Found `Link`                            | migrar              | CTA primary md canônico                                |
| Landing | logo, navegação legal/social e helper links | preservar           | navegação textual, marca ou ícone social               |
| Student | StudentHandoff `SecondaryLink`              | migrar              | retorno rotulado com aparência secondary lg            |
| Student | PlanSupport `HelpButton`                    | preservar           | controle contextual compacto dentro do painel de ajuda |
| Student | PublicPlans `FloatingWhatsappButton`        | preservar           | floating action de domínio, success e posição fixa     |
| Student | auth/legal/error links                      | preservar           | links inline/editoriais, sem recipe de ação            |
| Teacher | caminho anchor de `PillButton`              | migrar              | duplicação integral de variant, size, foco e loading   |
| Teacher | ClassDrawer Meet/material via `PillButton`  | migrar pelo adapter | links rotulados canônicos                              |
| Teacher | ClassRow `MeetLink`                         | preservar           | icon-only com accessible name, fora do v1              |
| Teacher | auth/legal/error links                      | preservar           | links inline/editoriais                                |
| Admin   | nenhum                                      | controle            | não há anchor com aparência canônica                   |
| Cupom   | links de relatório                          | controle            | links de dados/editoriais, sem recipe de ação          |

Nenhum item aprovado usa React Router. Portanto a adoção preserva navegação por `href` e não cria
full reload onde antes havia navegação client-side.
