'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Upload } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { cn } from '@/lib/utils';
import { colleges } from '@/data/collage';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

const admissionSchema = z.object({
  candidateName: z.string().min(2, 'Name is required'),
  subject: z.string().min(1, 'Subject is required'),
  candidateEmail: z.string().email('Invalid email address'),
  candidatePhone: z.string().min(10, 'Phone number is too short'),
  address: z.string().min(10, 'Address is required'),
  dateOfBirth: z.date({ required_error: 'Date of birth is required' }),
  image: z.instanceof(FileList).optional(),
});

const subjects = [
  'Computer Science',
  'Engineering',
  'Medicine',
  'Business Administration',
  'Liberal Arts',
  'Physics',
  'Mathematics',
  'Chemistry',
  'Biology',
  'Psychology',
  'Literature',
  'History',
  'Philosophy',
  'Economics',
  'Political Science',
];

export default function Admission() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [selectedCollege, setSelectedCollege] = useState(null);

  useEffect(() => {
    const collegeId = searchParams.get('college');
    if (collegeId) setSelectedCollege(collegeId);
  }, [searchParams]);

  const form = useForm({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      candidateName: user ? `${user.fastname} ${user.lastname}` : '',
      subject: '',
      candidateEmail: user?.email || '',
      candidatePhone: user?.phone || '',
      address: '',
      dateOfBirth: undefined,
      image: undefined,
    },
  });

  const handleCollegeSelect = collegeId => {
    setSelectedCollege(collegeId);
    router.push(`/admission?college=${collegeId}`);
  };

  const onSubmit = data => {
    const college = colleges.find(c => c.id === selectedCollege);
    const submission = {
      ...data,
      collegeName: college?.name,
      collegeLocation: college?.location,
    };

    // Store submission in local storage (or replace with API call)
    const existingSubmissions = JSON.parse(
      localStorage.getItem('myCollege') || '[]'
    );
    localStorage.setItem(
      'myCollege',
      JSON.stringify([...existingSubmissions, submission])
    );

    toast.success(`Application submitted to ${college?.name}`);
    console.log('Form Data:', submission);
    form.reset();
  };

  const selectedCollegeData = colleges.find(c => c.id === selectedCollege);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          College Admission
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Apply to your dream college and begin your academic journey today.
        </p>
      </section>

      <section className="py-8 px-4 max-w-6xl mx-auto">
        {!selectedCollege ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Choose a College
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {colleges.map(college => (
                <Card
                  key={college.id}
                  className="cursor-pointer hover:shadow-md transition"
                >
                  <CardHeader>
                    <div className="w-full h-40 overflow-hidden rounded-lg mb-3">
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardTitle>{college.name}</CardTitle>
                    <CardDescription>{college.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {college.description}
                    </p>
                    <Button
                      className="w-full mb-2"
                      onClick={() => handleCollegeSelect(college.id)}
                    >
                      Apply Now
                    </Button>
                    <Button
                      className="w-full"
                      onClick={() => router.push(`/colleges/${college.id}`)}
                    >
                      Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => setSelectedCollege(null)}
              className="mb-6"
            >
              ← Back to College Selection
            </Button>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>{selectedCollegeData?.name}</CardTitle>
                <CardDescription>
                  {selectedCollegeData?.location}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="max-w-md mx-auto border-dashed border-2 ">
              <CardHeader>
                <CardTitle>Admission Application</CardTitle>
                <CardDescription>Fill out the form below</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Name */}
                    <FormField
                      control={form.control}
                      name="candidateName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email */}
                    <FormField
                      control={form.control}
                      name="candidateEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="example@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Phone */}
                    <FormField
                      control={form.control}
                      name="candidatePhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+1234567890"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Address */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={3}
                              placeholder="Your full address"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Date of Birth */}
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    'w-full text-left',
                                    !field.value && 'text-muted-foreground'
                                  )}
                                >
                                  {field.value
                                    ? format(field.value, 'PPP')
                                    : 'Select date'}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={date =>
                                  date > new Date() ||
                                  date < new Date('1900-01-01')
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-wrap gap-2">
                      {/* Image Upload */}
                      <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { onChange, value, ...rest } }) => (
                          <FormItem>
                            <FormLabel>Profile Image</FormLabel>
                            <FormControl>
                              <div className="flex items-center gap-3">
                                <Input
                                  type="file"
                                  accept="image/*"
                                  onChange={e => onChange(e.target.files)}
                                  {...rest}
                                  className="hidden"
                                  id="image-upload"
                                />
                                <label
                                  htmlFor="image-upload"
                                  className="cursor-pointer px-4 py-2 border rounded-md flex items-center gap-2"
                                >
                                  <Upload className="w-4 h-4" />
                                  Upload
                                </label>
                                {value?.length > 0 && (
                                  <span className="text-sm text-muted-foreground">
                                    {value[0].name}
                                  </span>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* Subject */}
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Choose a subject" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {subjects.map(subject => (
                                  <SelectItem key={subject} value={subject}>
                                    {subject}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {/* Submit */}
                    <Button type="submit" className="w-full">
                      Submit Application
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </>
        )}
      </section>
    </div>
  );
}
