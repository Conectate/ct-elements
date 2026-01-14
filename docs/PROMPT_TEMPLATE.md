# Prompt Template para Generar Documentación de Componentes

Usa este prompt para generar documentación de componentes siguiendo la misma estructura y estilo que `ct-button`.

---

## Prompt

Basado en `@docs/ct-button/button.md` y `@src/ct-button.ts`, crea la documentación completa para `@docs/[COMPONENT_NAME]/[component-name].md` siguiendo exactamente la misma estructura, estilo y formato.

### Estructura requerida:

1. **Frontmatter de VitePress**:

    ```markdown
    ---
    outline: deep
    ---
    ```

2. **Script setup de Vue** (para ejemplos interactivos):

    ```vue
    <script setup>
    import { ref } from 'vue'
    import '@conectate/components/[component-name].js'

    // Variables reactivas para ejemplos interactivos
    const exampleVar = ref('')
    </script>
    ```

3. **Título del componente**: `# [component-name]`

4. **Descripción breve**: Una línea descriptiva del componente

5. **Installation**:
    - Comandos de instalación con pnpm y npm
    - Usar `@conectate/components` como paquete

6. **Basic Usage**:
    - Import statement con `.js` extension
    - Ejemplo con Vue (template + script setup)
    - Ejemplo con LitElement (TypeScript)
    - Ejemplo con React (TypeScript) incluyendo:
        - Declaración de tipos globales para TypeScript
        - Función exportada con useState si es necesario
        - Ejemplo con slots si aplica

7. **Variants** (si aplica):
    - Lista de variantes disponibles
    - Ejemplo interactivo usando variables reactivas de Vue

8. **Components** (si el paquete incluye múltiples componentes):
    - Lista de componentes incluidos

9. **Properties**:
    - Tabla con formato:
      | Property | Attribute | Type | Default | Description |
    - Usar tabs para indentación consistente

10. **Slots**:
    - Lista de slots disponibles
    - Ejemplo visual con HTML
    - Ejemplo de código

11. **CSS Variables**:
    - Bloque de código CSS con todas las variables organizadas por categorías:
        - Primary Colors
        - Text Colors
        - Shadow & Effects
        - Layout & Spacing
    - Tabla de referencia con todas las variables, defaults y descripciones
    - Ejemplos de personalización visuales y en código

12. **Accessibility (a11y)**:
    - Descripción breve
    - Ejemplo con aria-label si aplica

13. **Event Handling**:
    - Ejemplo interactivo con Vue (usando variables reactivas)
    - Ejemplo Vue (simple con console.log)
    - Ejemplo LitElement (simple con console.log)
    - Ejemplo React (simple con console.log)
    - Todos los ejemplos deben ser simples y consistentes

### Reglas de formato:

- **Indentación**: Usar tabs (no espacios) para código
- **Imports**: Siempre usar `@conectate/components/[component-name].js` con extensión `.js`
- **Ejemplos Vue**: Usar `<script setup>` y sintaxis moderna
- **Ejemplos React**: Incluir declaración de tipos TypeScript si es necesario
- **Ejemplos LitElement**: Usar decoradores y sintaxis moderna
- **Ejemplos interactivos**: Usar variables reactivas de Vue para demostraciones en vivo
- **Código inline**: Mantener en una línea cuando sea posible (especialmente en ejemplos HTML)
- **Espaciado**: Mantener consistencia en espaciado entre secciones

### Pasos a seguir:

1. Lee el archivo fuente del componente (`@src/[component-name].ts`) para identificar:
    - Todas las propiedades y atributos
    - Todas las variables CSS usadas
    - Todos los slots disponibles
    - Eventos que emite
    - Variantes o estados del componente

2. Lee el archivo fuente del componente (`@src/[component-name].ts`) para obtener información adicional

3. Genera el archivo siguiendo exactamente la estructura de `button.md`

4. Asegúrate de que:
    - Todos los ejemplos sean funcionales
    - Las variables CSS estén completas y organizadas
    - Los ejemplos de Vue, React y LitElement sean consistentes en estilo
    - Los ejemplos interactivos usen las variables reactivas definidas en `<script setup>`

### Ejemplo de uso:

```
Basado en @docs/ct-button/button.md crea los docs para @docs/ct-input/input.md
```

O para otro componente:

```
Basado en @docs/ct-button/button.md crea los docs para @docs/ct-card/card.md siguiendo la misma estructura y estilo
```

---

## Checklist antes de generar:

- [ ] Leer el archivo fuente del componente (`src/[component-name].ts`)
- [ ] Identificar todas las propiedades, slots, eventos y CSS variables
- [ ] Crear variables reactivas apropiadas en `<script setup>` para ejemplos interactivos
- [ ] Generar ejemplos consistentes para Vue, React y LitElement
- [ ] Incluir tabla completa de CSS variables con defaults y descripciones
- [ ] Verificar que el formato sea consistente con `button.md`
- [ ] Asegurar que todos los imports usen `.js` extension
- [ ] Verificar indentación con tabs
