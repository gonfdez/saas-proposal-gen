'use client';
import NumberFlow from '@number-flow/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslations } from 'next-intl';
import { BackgroundPaths } from './ui/shadcn-io/background-paths';

export default function PricingSection({ className }: { className?: string }) {
  const t = useTranslations("pricing")

  const [frequency, setFrequency] = useState<string>('monthly');

  const plans = [
    {
      id: 'hobby',
      name: t('hobby.name'),
      price: {
        monthly: t('hobby.price'),
        yearly: t('hobby.price'),
      },
      description: t('hobby.description'),
      features: [
        t("hobby.features.0"),
        t("hobby.features.1"),
        t("hobby.features.2"),
        t("hobby.features.3"),
        t("hobby.features.4"),
      ],
      cta: t("hobby.cta"),
      popular: false,
    },
    {
      id: 'pro',
      name: t('pro.name'),
      price: {
        monthly: 10,
        yearly: 8,
      },
      description: t('pro.description'),
      features: [
        t("pro.features.0"),
        t("pro.features.1"),
        t("pro.features.2"),
        t("pro.features.3"),
        t("pro.features.4"),
      ],
      cta: t("pro.cta"),
      popular: true,
    },
    // {
    //   id: 'enterprise',
    //   name: 'Enterprise',
    //   price: {
    //     monthly: 'Get in touch for pricing',
    //     yearly: 'Get in touch for pricing',
    //   },
    //   description: 'Critical security, performance, observability and support.',
    //   features: [
    //     'You can DDOS our API.',
    //     'Nano-second checks.',
    //     'Invite your extended family.',
    //     'Unlimited monitors.',
    //     "We'll sit on your desk.",
    //   ],
    //   cta: 'Contact us',
    // },
  ];

  return (
    <section className={`relative flex justify-center ${className || ""}`}>
      <div className="absolute inset-0 z-9">
        <BackgroundPaths />
      </div>
      <div className="not-prose flex flex-col gap-16 px-8 py-24 text-center z-10">
        <div className="flex flex-col items-center justify-center gap-8">
          <h1 className="mb-0 text-balance font-medium text-5xl tracking-tighter!">
            {t('title')}
          </h1>
          <p className="mx-auto mt-0 mb-0 max-w-2xl text-balance text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
          <Tabs defaultValue={frequency} onValueChange={setFrequency}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="yearly">
                Yearly
                <Badge variant="secondary">20% off</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="mt-8 grid w-full max-w-4xl gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card
                className={cn(
                  'relative w-full text-left',
                  plan.popular && 'ring-2 ring-primary'
                )}
                key={plan.id}
              >
                {plan.popular && (
                  <Badge className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2 rounded-full">
                    Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="font-medium text-xl">
                    {plan.name}
                  </CardTitle>
                  <CardDescription>
                    <p className='mb-4'>{plan.description}</p>
                    {typeof plan.price[frequency as keyof typeof plan.price] ===
                      'number' ? (
                      <NumberFlow
                        className="font-medium text-foreground"
                        format={{
                          style: 'currency',
                          currency: 'USD',
                          maximumFractionDigits: 0,
                        }}
                        suffix={`/month, billed ${frequency}.`}
                        value={
                          plan.price[
                          frequency as keyof typeof plan.price
                          ] as number
                        }
                      />
                    ) : (
                      <span className="font-medium text-foreground">
                        {plan.price[frequency as keyof typeof plan.price]}.
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-2">
                  {plan.features.map((feature, index) => (
                    <div
                      className="flex items-center gap-2 text-muted-foreground text-sm"
                      key={index}
                    >
                      <BadgeCheck className="h-4 w-4" />
                      {feature}
                    </div>
                  ))}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={plan.popular ? 'default' : 'secondary'}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section >
  );
};