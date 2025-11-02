import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Palette, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TutorialCustomizingSpinWheelColors = () => {
  return (
    <>
      <Helmet>
        <title>
          How to Customize Spin Wheel Colors - Complete Guide | Hi Honey
        </title>
        <meta
          name="description"
          content="Learn how to customize spin wheel colors effectively. Discover color theory basics, accessibility considerations, and step-by-step instructions for creating visually appealing wheels."
        />
        <meta
          name="keywords"
          content="spin wheel colors, customize spin wheel, color picker, wheel customization, color scheme, visual design, accessibility colors"
        />
        <link
          rel="canonical"
          href="https://hihoney.site/tutorial-customizing-spin-wheel-colors"
        />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Palette className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            How to Customize Spin Wheel Colors
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Creating Visually Appealing and Accessible Wheels
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Color customization is one of the most powerful ways to make
                your spin wheel visually appealing and functional. Whether you
                want to match brand colors, improve readability, or create
                thematic wheels, understanding how to effectively customize
                colors is essential.
              </p>
              <p>
                This tutorial covers everything you need to know about
                customizing spin wheel colors, from basic color changes to
                advanced color theory and accessibility considerations. You'll
                learn practical techniques that will help you create wheels that
                look great and work well in any context.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Why Customize Colors?
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Brand Consistency</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Match your organization's brand colors to create cohesive
                  experiences that reinforce brand identity.
                </p>
              </Card>
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Improved Readability</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Choose contrasting colors that make text easily readable,
                  especially important for classroom or professional settings.
                </p>
              </Card>
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Visual Appeal</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create visually engaging wheels that capture attention and
                  make activities more exciting and memorable.
                </p>
              </Card>
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Thematic Design</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use colors to match themes—holiday wheels, seasonal
                  activities, or special event color schemes.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Basic Color Customization Steps
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Step 1: Locate the Color Picker
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Most spin wheel tools display a color circle or square next to
                  each entry in the entries list. This is your color picker
                  interface—click on it to open the color selection tool.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Where to Find It:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>In the entries list, next to each entry name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Usually appears as a colored circle or square</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        May be labeled with a color icon or palette symbol
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Step 2: Select Your Color
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Clicking the color picker opens a color selection interface.
                  Most tools offer multiple ways to choose colors: color palette
                  presets, color wheel, hex code input, or RGB sliders.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Color Selection Methods:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Preset Palette:</strong> Click from a grid of
                        predefined colors
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Color Wheel:</strong> Drag to select any color
                        visually
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Hex Code:</strong> Enter exact color codes like
                        #FF5733
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>RGB Sliders:</strong> Adjust red, green, and
                        blue values
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Step 3: Apply and Verify
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  After selecting a color, it should automatically apply to the
                  wheel segment. The color circle in the entries list updates,
                  and the corresponding segment on the wheel changes
                  immediately.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Verification Tips:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Check the wheel to confirm the color changed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Verify text remains readable against the new background
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Ensure the color contrasts well with adjacent segments
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Color Theory Basics for Spin Wheels
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Understanding basic color theory helps you create wheels that
                look professional and work well. You don't need to be a
                designer—just follow these simple principles.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Contrast is Key
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Use contrasting colors between adjacent segments. Light
                    colors next to dark colors create clear visual separation.
                    Avoid similar colors side-by-side (e.g., light blue next to
                    light green).
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Readability First
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Text must be readable against background colors. Dark text
                    on light backgrounds or light text on dark backgrounds works
                    best. Test from a distance if the wheel will be displayed on
                    a screen.
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Color Harmony
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Use harmonious color schemes. Analogous colors (next to each
                    other on the color wheel) create pleasant, cohesive looks.
                    Complementary colors (opposites) create dynamic contrast.
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Avoid Too Many Colors
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Limit your color palette. Using 4-6 distinct colors works
                    better than 20 different shades. Reuse colors strategically
                    rather than making every segment unique.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Common Color Schemes
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Professional/Business Schemes
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  For corporate or professional settings, use muted,
                  sophisticated colors. Think navy blue, charcoal gray,
                  burgundy, forest green, and deep purple.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Recommended Colors:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Dark blue (#1e3a8a), dark gray (#374151), maroon (#7f1d1d),
                    dark green (#064e3b), deep purple (#581c87)
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Vibrant/Fun Schemes
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  For playful activities, classrooms, or casual events, use
                  bright, energetic colors. Think bright red, sunny yellow,
                  electric blue, vivid green, and vibrant orange.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Pastel Schemes
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  For gentle, calming environments or when you need many
                  distinct colors, pastels work well. Soft pink, light blue,
                  pale yellow, lavender, and mint green create pleasant,
                  easy-to-distinguish segments.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Holiday/Seasonal Schemes
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Match seasonal themes: red and green for Christmas, orange and
                  black for Halloween, pastels for spring, warm colors for
                  autumn. This adds thematic relevance to your wheel.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Accessibility Considerations
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Color accessibility ensures your wheel is usable by everyone,
                including those with color vision differences. Follow these
                guidelines to create inclusive wheels.
              </p>
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-4">
                <p className="font-semibold mb-2 text-foreground">
                  Accessibility Best Practices:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Don't rely solely on color:</strong> Use text
                      labels or patterns in addition to colors for
                      identification
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>High contrast:</strong> Maintain at least 4.5:1
                      contrast ratio between text and background colors
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Avoid red-green combinations:</strong> These are
                      problematic for color-blind users (8% of men)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Test with grayscale:</strong> Ensure segments are
                      distinguishable even when colors are removed
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Using Brand Colors
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                If you're creating wheels for a business, organization, or
                event, matching brand colors creates professional consistency.
                Here's how to find and apply your brand colors.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mt-3">
                <p className="font-semibold mb-2 text-foreground">
                  Finding Your Brand Colors:
                </p>
                <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                  <li>Check your brand guidelines document or style guide</li>
                  <li>Look at your website or logo for color codes</li>
                  <li>
                    Use a color picker tool to extract colors from your logo
                  </li>
                  <li>
                    Ask your marketing or design team for official hex codes
                  </li>
                </ol>
              </div>
              <p className="mt-4">
                Once you have the hex codes (format: #RRGGBB), enter them
                directly into the color picker's hex input field. This ensures
                exact brand color matching.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Tips for Better Color Choices
            </h2>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Start with a Base Palette
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose 4-6 base colors first, then alternate them around the
                  wheel. This creates visual rhythm and prevents color chaos.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Test Your Wheel
                </h3>
                <p className="text-sm text-muted-foreground">
                  After customizing colors, spin the wheel multiple times and
                  view it from different angles. Ensure all segments are clearly
                  distinguishable even when spinning.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Consider Your Audience
                </h3>
                <p className="text-sm text-muted-foreground">
                  Children respond better to bright, vibrant colors.
                  Professional audiences prefer sophisticated, muted tones.
                  Adjust your palette accordingly.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Save Color Palettes
                </h3>
                <p className="text-sm text-muted-foreground">
                  If you find a color combination that works well, write down
                  the hex codes for future use. This saves time when creating
                  similar wheels.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-destructive">
                <h3 className="font-semibold mb-2 text-foreground">
                  ❌ Too Many Similar Colors
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Ensure adjacent segments use
                  contrasting colors. If you have similar shades, separate them
                  on the wheel.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-destructive">
                <h3 className="font-semibold mb-2 text-foreground">
                  ❌ Poor Text Contrast
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Always check that entry text is
                  readable against the background. If not, choose a darker or
                  lighter shade.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-destructive">
                <h3 className="font-semibold mb-2 text-foreground">
                  ❌ Ignoring Accessibility
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Remember that not everyone sees
                  colors the same way. Use text labels and high contrast to
                  ensure everyone can use your wheel.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-destructive">
                <h3 className="font-semibold mb-2 text-foreground">
                  ❌ Random Color Assignment
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Plan your color scheme before
                  assigning colors. This creates a more cohesive, professional
                  appearance.
                </p>
              </Card>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Start Customizing Your Wheel Colors Today
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Color customization is a simple yet powerful way to enhance your
              spin wheel. Whether you're matching brand colors, improving
              readability, or creating thematic designs, the techniques in this
              tutorial will help you create visually appealing and functional
              wheels.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Remember: good color choices improve both aesthetics and
              functionality. Start experimenting with different color schemes
              and find what works best for your specific use case.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Customize Your Wheel Colors
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                More Customization Tutorials
                <Palette className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </Card>

        {/* Related Articles */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Related Tutorials</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Continue learning with these related tutorials
            </p>
            <div className="space-y-2">
              <Link
                to="/tutorial-creating-your-first-spin-wheel"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Creating Your First Wheel →
              </Link>
              <Link
                to="/tutorial-adding-images-to-spin-wheels"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Adding Images →
              </Link>
              <Link
                to="/tutorial-managing-spin-wheel-entries"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Managing Entries →
              </Link>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">How-to Guides</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Practical guides for using spin wheels effectively
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
              Having trouble customizing your wheel colors? We're here to help!
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

export default TutorialCustomizingSpinWheelColors;
