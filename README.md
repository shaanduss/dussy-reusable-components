# Dussy Components

A collection of reusable React UI components and higher-level components for financial and form-based applications.

## Installation

```bash
npm install dussy-components
```

## Usage

### Basic Import

```tsx
import { FinancialCard, ProgressCard, FormBox } from 'dussy-components';

function App() {
  return (
    <div>
      <FinancialCard
        title="Revenue"
        amount="$1,234.56"
        change="+12.5%"
        changeType="positive"
      />
      
      <ProgressCard
        title="Progress"
        progress={75}
        total={100}
      />
      
      <FormBox>
        {/* Your form content */}
      </FormBox>
    </div>
  );
}
```

### Using the CLI (shadcn/ui style)

You can use the CLI to add components to your project:

```bash
# Install the package first
npm install dussy-components

# Add specific components
npx dussy-components@latest add form-box
npx dussy-components@latest add financial-card
npx dussy-components@latest add progress-card
```

This will create example component files in your `src/components/ui/` directory.

## Available Components

### UI Components
- `Button` - Customizable button component
- `Card` - Card container component
- `Checkbox` - Checkbox input component
- `Dialog` - Modal dialog component
- `Input` - Text input component
- `Label` - Form label component
- `RadioGroup` - Radio button group component
- `Select` - Dropdown select component
- `Separator` - Visual separator component
- `Textarea` - Multi-line text input component
- `Accordion` - Collapsible content component
- `SymbolInputLeft` - Input with left symbol
- `SymbolInputRight` - Input with right symbol

### Higher-Level Components
- `FinancialCard` - Financial data display card
- `ProgressCard` - Progress tracking card
- `CircularProgress` - Circular progress indicator
- `FormBox` - Form container component
- `FormBlock` - Form section block
- `FormSection` - Form section component

## Dependencies

This library requires the following peer dependencies:

- React 19+
- React DOM 19+
- Tailwind CSS
- Radix UI components
- Lucide React (for icons)
- React Hook Form
- Zod (for validation)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Build CLI only
npm run build:cli
```

## License

MIT
