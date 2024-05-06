'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ContactEvent } from '@/lib/customer-insights/types';
import { formatDate, formatDistanceToNow } from 'date-fns';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type TimelineData = {
  label: string;
  description: string;
  value: number;
  timelineValue: number;
  date: Date;
};

type Props = {
  events?: ContactEvent[];
};

export function EventTimeline({ ...props }: Props) {
  const [events, setEvents] = useState<TimelineData[] | undefined>();
  const { theme: mode } = useTheme();

  useEffect(() => {
    if (!props.events) return;

    let lastTimelineValue = 0;
    let lastEventTime: Date | undefined;
    const mappedEvents: TimelineData[] = props.events.reverse().map((e) => {
      const newEventTime = new Date(e.time);
      if (!lastEventTime) {
        lastEventTime = new Date(e.time);
      }
      // Calculate the difference in milliseconds
      const timeDifference = newEventTime.getTime() - lastEventTime.getTime();
      // Convert diff milliseconds to days
      const dayDiff = Math.round(timeDifference / (1000 * 60 * 60 * 24));
      // Calculate a scaled difference for timeline value
      const timelineValue = lastTimelineValue + Math.ceil(dayDiff / 180) + 1;
      // Track recent changes to be compared to next data
      lastTimelineValue = timelineValue;
      lastEventTime = newEventTime;

      return {
        label: e.event,
        description: e.type,
        value: 100, // YAxis Value
        timelineValue: timelineValue, // XAxis Value
        date: newEventTime,
      };
    });

    setEvents(mappedEvents.reverse());
  }, [props.events]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Timeline</CardTitle>
        <CardDescription>Contact events based on frequency.</CardDescription>
      </CardHeader>
      <CardContent className='pb-4'>
        <div className='h-[150px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              data={events}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as unknown as TimelineData;
                    return (
                      <div className='rounded-lg border bg-background p-4 shadow-sm max-w-[400px]'>
                        <div className=''>
                          <div className='flex flex-col gap-3'>
                            <span className='capitalize text-sm w-full'>
                              {data.label}
                            </span>
                            <span className='capitalize text-xs w-full text-muted-foreground'>
                              {formatDate(
                                new Date(data.date),
                                'dd-MMM-yyyy HH:mm:ss'
                              )}
                            </span>
                            <div className='flex gap-2'>
                              <Badge
                                className='w-fit capitalize'
                                variant='secondary'
                              >
                                {data.description}
                              </Badge>
                              <Badge
                                variant='outline'
                                className='w-fit text-muted-foreground'
                              >
                                {formatDistanceToNow(new Date(data.date), {
                                  addSuffix: true,
                                })}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <XAxis
                dataKey='timelineValue'
                type='number'
                scale='time'
                domain={['auto', 'auto']}
                tickCount={events?.length ?? 0}
                hide
              />
              <YAxis type='number' domain={[0, 200]} hide />
              <Line
                type='monotone'
                dataKey='value'
                strokeWidth={2}
                activeDot={{
                  r: 10,
                  style: { fill: 'var(--theme-primary)', opacity: 0.25 },
                }}
                style={
                  {
                    stroke: 'var(--theme-primary)',
                    '--theme-primary': `hsl(${
                      mode === 'dark' ? '210 20% 98%' : '220.9 39.3% 11%'
                    })`,
                  } as React.CSSProperties
                }
                yAxisId={0}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
