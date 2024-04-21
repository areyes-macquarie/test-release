## Page Components

This folder is intended to contain shared page components.

### What are shared page components?

Shared page components are components that wraps page components which is then shared between web app and teams app.

It should ideally make it easy to support multiple view points by maintaining only a single source code.

### Folder Structure

Structure of the shared page components should simply follow the hierarchical structure of the web pages to make it easier to understand which path these page components are used.

Shared page components can be also have sub-components. These sub-components can be placed in a `_components` folder under their main component.

### How to reference shared page components?

Here is an example of using CustomerInsightsAccountDetailsPage.

```typescript
import LoadingPage from '@/app/loading';
import CustomerInsightsAccountDetailsPage from '@/components/page/customer-insights/accounts/[id]';
import { Suspense } from 'react';

type Props = {
  params: { id: string };
};

export default function CustomerInsightsAccountDetailsWebsite({
  params,
}: Props) {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CustomerInsightsAccountDetailsPage {...params} />
    </Suspense>
  );
}
```
