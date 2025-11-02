import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Image, CheckCircle2, Upload, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TutorialAddingImagesToSpinWheels = () => {
  return (
    <>
      <Helmet>
        <title>
          How to Add Images to Spin Wheels - Complete Tutorial | Hi Honey
        </title>
        <meta
          name="description"
          content="Learn how to add images to your spin wheel entries. Discover best practices for image selection, file formats, sizing, and creating visually engaging wheels."
        />
        <meta
          name="keywords"
          content="spin wheel images, add images to wheel, image upload, wheel customization, visual wheel, image formats, spin wheel tutorial"
        />
        <link
          rel="canonical"
          href="https://hihoney.site/tutorial-adding-images-to-spin-wheels"
        />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Image className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            How to Add Images to Spin Wheels
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Creating Visually Engaging Wheels with Custom Images
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Adding images to your spin wheel entries transforms a basic
                wheel into a visually engaging tool that's perfect for
                classrooms, branding, or visual learning. Whether you're adding
                logos, product images, or educational graphics, images make
                wheels more memorable and easier to identify.
              </p>
              <p>
                This tutorial walks you through everything you need to know
                about adding images to spin wheels: from file preparation to
                upload process, from best practices to troubleshooting common
                issues. You'll learn how to create professional-looking wheels
                that capture attention and enhance your activities.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Add Images to Your Wheel?
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Image className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Visual Recognition</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Images help participants identify options quickly, especially
                  useful for children or when text might be small.
                </p>
              </Card>
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Brand Integration</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Add logos or branded images to create professional, cohesive
                  experiences that reinforce brand identity.
                </p>
              </Card>
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Enhanced Engagement</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Visual wheels are more exciting and memorable, increasing
                  participation and enjoyment in activities.
                </p>
              </Card>
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Learning Support</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  For educational wheels, images reinforce concepts and help
                  visual learners better understand options.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Step-by-Step: Adding Images
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Step 1: Prepare Your Images
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Before uploading, ensure your images are properly formatted
                  and sized. This ensures fast loading and optimal display on
                  the wheel.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Image Requirements:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Formats:</strong> JPG, PNG, or WebP (most tools
                        support these)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Size:</strong> Keep under 2MB for fast loading
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Dimensions:</strong> Square images (1:1 ratio)
                        display best
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Quality:</strong> Clear, well-lit images work
                        better than blurry or dark photos
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Step 2: Locate the Image Upload Feature
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  In the entries list, look for an image icon, upload button, or
                  camera symbol next to each entry. This is your image upload
                  interface.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Where to Find It:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Next to each entry in the entries list</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>May appear as a camera, image, or upload icon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Clicking opens your device's file picker</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Step 3: Upload Your Image
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Click the image icon to open your file browser. Navigate to
                  your image file, select it, and the image should automatically
                  upload and appear on the wheel segment.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Upload Process:
                  </p>
                  <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                    <li>Click the image icon next to an entry</li>
                    <li>Your device's file picker opens</li>
                    <li>Navigate to and select your image file</li>
                    <li>The image uploads automatically</li>
                    <li>Verify it appears correctly on the wheel</li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Step 4: Verify and Adjust
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  After uploading, check that the image displays correctly on
                  the wheel segment. Ensure it's clear, properly sized, and
                  appropriately positioned.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Best Practices for Image Selection
            </h2>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Use Square Images
                </h3>
                <p className="text-sm text-muted-foreground">
                  Square images (1:1 aspect ratio) display best on circular
                  wheel segments. Crop rectangular images to squares before
                  uploading for optimal appearance.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Keep Images Simple
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose clear, simple images that are easily recognizable from
                  a distance. Complex or cluttered images may be hard to
                  identify when the wheel is spinning.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Optimize File Size
                </h3>
                <p className="text-sm text-muted-foreground">
                  Compress images before uploading to ensure fast loading. Most
                  images can be compressed to under 500KB without noticeable
                  quality loss, significantly improving load times.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Use Appropriate Images
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ensure all images are appropriate for your audience. For
                  educational or professional use, choose images that align with
                  your context and purpose.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Common Use Cases
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Classroom Activities
                </h3>
                <p className="mb-3">
                  Add images of objects, animals, shapes, or concepts to create
                  educational wheels. This helps visual learners and makes
                  activities more engaging for young students.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Branded Events
                </h3>
                <p className="mb-3">
                  Include company logos, product images, or branded graphics to
                  create professional wheels that reinforce brand identity
                  during corporate events or marketing activities.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Menu Selection
                </h3>
                <p className="mb-3">
                  For restaurants or meal planning, add images of dishes or food
                  items to help participants visualize options before selection.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Activity Wheels
                </h3>
                <p className="mb-3">
                  Create wheels with activity images—sports, hobbies, or
                  exercises. Visual representation helps participants understand
                  options quickly.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Removing or Replacing Images
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                If you need to remove an image or replace it with a different
                one, most tools allow you to click the image icon again. This
                typically opens options to remove the current image or upload a
                new one.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mt-3">
                <p className="font-semibold mb-2 text-foreground">
                  To Remove an Image:
                </p>
                <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                  <li>Click the image icon next to the entry</li>
                  <li>Look for a "Remove" or "Clear" option</li>
                  <li>Confirm removal</li>
                  <li>The segment returns to text-only display</li>
                </ol>
              </div>
              <p className="mt-4">
                <strong>To Replace an Image:</strong> Simply click the image
                icon again and select a new image file. The new image replaces
                the old one automatically.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Troubleshooting
            </h2>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Issue: Image Won't Upload
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solutions:</strong> Check file format (JPG, PNG,
                  WebP), ensure file size is under the limit (usually 2-5MB),
                  verify browser permissions allow file access, try a different
                  image file.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Issue: Image Appears Distorted
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solutions:</strong> Use square images (1:1 ratio),
                  crop rectangular images before uploading, check that original
                  image isn't stretched or compressed.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Issue: Image Loads Slowly
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solutions:</strong> Compress images to smaller file
                  sizes, use WebP format for better compression, reduce image
                  dimensions before uploading, optimize images using online
                  tools.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Issue: Image Too Small to See
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solutions:</strong> Use higher resolution images (at
                  least 300x300 pixels), ensure images are clear and not
                  pixelated, test image visibility after upload.
                </p>
              </Card>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start Adding Images to Your Wheels Today
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Adding images to your spin wheel is a simple way to create more
              engaging, memorable, and visually appealing experiences. Whether
              you're enhancing classroom activities, branding corporate events,
              or creating educational tools, images make your wheels stand out.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Remember to prepare your images properly, choose appropriate
              visuals for your audience, and optimize file sizes for best
              performance. With these techniques, you'll create professional
              wheels that capture attention and enhance your activities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Add Images to Your Wheel
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                More Customization Tutorials
                <Image className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </Card>

        {/* Related Articles */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Related Tutorials</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Continue customizing your wheel
            </p>
            <div className="space-y-2">
              <Link
                to="/tutorial-creating-your-first-spin-wheel"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Creating Your First Wheel →
              </Link>
              <Link
                to="/tutorial-customizing-spin-wheel-colors"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Customize Colors →
              </Link>
              <Link
                to="/tutorial-managing-spin-wheel-entries"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Manage Entries →
              </Link>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Upload className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">How-to Guides</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Learn practical applications
            </p>
            <div className="space-y-2">
              <Link
                to="/how-to-use-spin-wheels-in-classrooms"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Classroom Use →
              </Link>
              <Link
                to="/how-to-create-fair-giveaways-with-spin-wheels"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Fair Giveaways →
              </Link>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Get Help</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Having trouble adding images? We're here to help!
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
      </article>
    </>
  );
};

export default TutorialAddingImagesToSpinWheels;
