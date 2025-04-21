import { Loader } from 'rizzui';

export const LoaderOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white/80">
    <Loader variant="spinner" />
  </div>
);