import Head from 'next/head';
import { Button } from '../components/Button';

export default function Home() {
  return (
    <div>
      Hello, Freelance Delivery!
       <Button primary={true}>Hello!</Button>
    </div>
  );
}
