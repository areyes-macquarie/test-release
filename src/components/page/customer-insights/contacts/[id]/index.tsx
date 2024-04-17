import { ContactSection } from './components/contact-section';

type Props = {
  id: string;
};

export default function CustomerInsightsContactDetailsPage({
  ...props
}: Props) {
  return (
    <div className='h-full px-4 pt-6 pb-12 lg:px-8 space-y-6'>
      <ContactSection contactId={props.id} />
    </div>
  );
}
