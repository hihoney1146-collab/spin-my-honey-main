import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import {
  PlayCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Lightbulb,
} from "lucide-react";
import { Link } from "react-router-dom";

const TutorialCreatingYourFirstSpinWheel = () => {
  return (
    <>
      <Helmet>
        <title>
          Step-by-Step Tutorial: Creating Your First Custom Spin Wheel | Hi
          Honey
        </title>
        <meta
          name="description"
          content="Follow our detailed step-by-step tutorial to create your first custom spin wheel. Learn how to add entries, customize colors, and use your wheel effectively."
        />
        <meta
          name="keywords"
          content="spin wheel tutorial, how to create spin wheel, spin wheel guide, custom spin wheel, spin wheel setup, spin wheel instructions"
        />
        <link
          rel="canonical"
          href="https://hihoney.site/tutorial-creating-your-first-spin-wheel"
        />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <PlayCircle className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Step-by-Step Tutorial: Creating Your First Custom Spin Wheel
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            A Beginner's Guide to Custom Spin Wheel Creation
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Creating your first custom spin wheel is easier than you might
                think. Whether you need it for a classroom activity, team
                meeting, family game night, or personal decision-making, this
                comprehensive tutorial will walk you through every step of the
                process.
              </p>
              <p>
                This guide is designed for complete beginners. By the end,
                you'll know how to create, customize, and use your own spin
                wheel for any purpose. We'll cover everything from adding your
                first entries to advanced customization options.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Basic Setup</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  How to add entries and create your first wheel
                </p>
              </Card>
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Customization</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Personalizing colors, images, and settings
                </p>
              </Card>
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <PlayCircle className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Usage Tips</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Best practices for spinning and managing your wheel
                </p>
              </Card>
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Advanced Features</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Exploring advanced options and techniques
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Step 1: Getting Started
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Before creating your first spin wheel, you'll need to access a
                spin wheel tool. For this tutorial, we'll use Hi Honey's free
                online spin wheel, but these principles apply to most digital
                spin wheel platforms.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mt-3">
                <p className="font-semibold mb-2 text-foreground">
                  Initial Setup:
                </p>
                <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                  <li>Navigate to the spin wheel page</li>
                  <li>Familiarize yourself with the interface</li>
                  <li>Locate the "Add Entry" or "Manage Entries" section</li>
                  <li>Notice the default entries already on the wheel</li>
                </ol>
              </div>
              <p className="mt-4">
                Most spin wheel tools come with a few default entries to help
                you understand how they work. You can replace these with your
                own options immediately.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Step 2: Adding Your First Entries
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Understanding the Entry System
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Each spin wheel consists of multiple entries—these are the
                  options that the wheel can randomly select from. Each entry
                  represents one possibility in your decision-making process.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Example Use Cases:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Name Picker:</strong> Each entry is a person's
                        name
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Decision Maker:</strong> Each entry is a choice
                        option
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Activity Selector:</strong> Each entry is an
                        activity
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Task Assigner:</strong> Each entry is a task or
                        responsibility
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Adding Entries: Detailed Steps
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-3 text-foreground">
                    Step-by-Step Process:
                  </p>
                  <ol className="space-y-3 text-sm text-muted-foreground ml-4 list-decimal">
                    <li>
                      <strong>Locate the Entry Input Field:</strong> Find the
                      text box labeled "Add New Entry" or "Enter name..." in the
                      controls panel (usually on the right side of the screen).
                    </li>
                    <li>
                      <strong>Type Your First Entry:</strong> Click in the input
                      field and type the first option you want on your wheel.
                      For example, if creating a lunch location wheel, type
                      "Italian Restaurant."
                    </li>
                    <li>
                      <strong>Add the Entry:</strong> Click the "Add" button
                      (usually featuring a plus icon) or press Enter on your
                      keyboard. The entry will appear on the wheel and in the
                      entries list.
                    </li>
                    <li>
                      <strong>Repeat for All Options:</strong> Continue adding
                      entries until all your options are included. Most spin
                      wheels support unlimited entries, though readability
                      decreases with very large numbers (50+ entries).
                    </li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Tips for Entry Creation
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Keep Names Short:</strong> Long entries can be
                      hard to read on the wheel. Use concise, clear labels.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Be Consistent:</strong> Use similar naming styles
                      (all full names, all first names, etc.) for better visual
                      consistency.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Minimum Two Entries:</strong> You need at least
                      two entries to spin the wheel. Most tools prevent spinning
                      with fewer entries.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Review Before Spinning:</strong> Double-check that
                      all intended entries are included before using the wheel.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Step 3: Understanding Default Features
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Most modern spin wheel tools automatically assign features to
                your entries. Understanding these defaults helps you know what
                to expect and what you might want to customize.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Automatic Color Assignment
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Each entry automatically receives a unique color from a
                    predefined palette. This creates visual distinction between
                    segments.
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    You can customize these colors later if desired.
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Equal Segment Sizes
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    All entries are automatically given equal-sized segments,
                    ensuring fair probability for each option.
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    This is essential for fair random selection.
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Active Status
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    All new entries are set to "active" by default, meaning
                    they're included in spins.
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    You can deactivate entries temporarily without deleting
                    them.
                  </p>
                </Card>
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Auto-Save Functionality
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Many tools automatically save your wheel configuration to
                    browser storage, so your entries persist between sessions.
                  </p>
                  <p className="text-xs text-muted-foreground italic">
                    Check your tool's documentation for save features.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Step 4: Your First Spin
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Once you have at least two entries on your wheel, you're ready
                for your first spin. The spinning process is simple but
                exciting—watch as the wheel rotates and comes to rest on one
                option.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mt-3">
                <p className="font-semibold mb-3 text-foreground">
                  How to Spin:
                </p>
                <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                  <li>
                    <strong>Verify Your Entries:</strong> Check that all desired
                    entries are visible on the wheel and marked as active.
                  </li>
                  <li>
                    <strong>Locate the Spin Button:</strong> Find the large
                    "Spin the Wheel!" button, usually located below or near the
                    wheel display.
                  </li>
                  <li>
                    <strong>Click to Spin:</strong> Click or tap the spin
                    button. The wheel will begin rotating with a realistic
                    spinning animation.
                  </li>
                  <li>
                    <strong>Watch the Result:</strong> Observe as the wheel
                    slows down and eventually stops on one entry. This is your
                    randomly selected result.
                  </li>
                  <li>
                    <strong>Celebrate the Winner:</strong> Most tools display
                    the selected entry prominently with celebration effects like
                    confetti or highlights.
                  </li>
                </ol>
              </div>
              <p className="mt-4">
                <strong>What to Expect:</strong> The spinning animation
                typically lasts 3-5 seconds, creating anticipation before
                revealing the result. Sound effects may accompany the spinning
                for added excitement, though these can usually be muted if
                needed.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Step 5: Basic Customization
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Changing Entry Colors
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Each entry gets a default color, but you can customize these
                  to match your preferences, brand colors, or visual themes.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    How to Change Colors:
                  </p>
                  <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                    <li>
                      Locate the color circle next to each entry in the entries
                      list
                    </li>
                    <li>Click on the color circle to open the color picker</li>
                    <li>Choose your desired color from the color palette</li>
                    <li>The wheel segment color updates automatically</li>
                  </ol>
                </div>
                <p className="text-sm text-muted-foreground italic mt-3">
                  <strong>Tip:</strong> Use contrasting colors for adjacent
                  segments to improve readability. Avoid similar colors next to
                  each other.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Editing Entry Text
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Need to fix a typo or change an entry name? Most tools allow
                  you to edit entries after creation.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Editing Steps:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Click directly on the entry text in the entries list
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Modify the text in the input field</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Press Enter or click outside the field to save
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        The wheel updates automatically with your changes
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Removing Entries
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  To remove an entry from your wheel, most tools provide a
                  delete or trash icon next to each entry in the list.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Important Note:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You typically need at least two entries to spin the wheel.
                    If you delete entries and only have one remaining, you'll
                    need to add another before spinning again.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Step 6: Advanced Features
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Activating and Deactivating Entries
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Sometimes you want to temporarily exclude entries without
                  deleting them. The activate/deactivate feature lets you toggle
                  entries on and off.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Use Cases for Deactivation:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        A student has already answered, so you temporarily
                        remove them from the wheel
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        A contestant has already won a prize, so you exclude
                        them from future spins
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        An option is temporarily unavailable but may be needed
                        later
                      </span>
                    </li>
                  </ul>
                </div>
                <p className="text-sm text-muted-foreground italic mt-3">
                  <strong>Tip:</strong> Deactivated entries remain in your list
                  but are excluded from spins. Reactivate them anytime by
                  clicking the toggle button again.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Adding Images to Entries
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Some spin wheel tools allow you to add images to entries,
                  making the wheel more visually engaging. This is especially
                  useful for classroom activities, branding, or visual learning.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    How to Add Images:
                  </p>
                  <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                    <li>
                      Locate the image icon next to an entry in the entries list
                    </li>
                    <li>Click the image icon to open the file picker</li>
                    <li>
                      Select an image file from your device (JPG, PNG, or WebP
                      formats typically supported)
                    </li>
                    <li>
                      The image appears on the wheel segment automatically
                    </li>
                    <li>
                      To remove an image, click the image icon again and clear
                      the selection
                    </li>
                  </ol>
                </div>
                <p className="text-sm text-muted-foreground italic mt-3">
                  <strong>Best Practices:</strong> Use square images for best
                  display. Keep file sizes reasonable for faster loading. Ensure
                  images are appropriate for your audience.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Organizing Entries: Shuffle and Sort
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Most spin wheels include tools to reorganize your entries:
                  shuffle for random order or sort for alphabetical order.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <Card className="p-4 bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Shuffle Function
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Randomly reorders all entries while keeping them all
                      active. Useful when you want to mix up the visual order of
                      options.
                    </p>
                  </Card>
                  <Card className="p-4 bg-primary/5 border border-primary/20">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Sort Function
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Arranges entries alphabetically. Helpful for organizing
                      long lists or finding specific entries quickly.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Step 7: Saving and Reusing Your Wheel
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Once you've created a wheel configuration you like, you'll want
                to save it for future use. Understanding how saving works helps
                you maintain different wheels for different purposes.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mt-3">
                <p className="font-semibold mb-2 text-foreground">
                  Automatic Saving:
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  Many modern spin wheel tools automatically save your
                  configuration to your browser's local storage. This means:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Your wheel persists when you close and reopen the browser
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Changes are saved automatically as you make them
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      No need to manually save—just create and it's preserved
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-4">
                <p className="font-semibold mb-2 text-foreground">
                  Important Considerations:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Browser-Specific:</strong> Saved wheels are
                      typically stored per browser. Switching browsers means
                      starting fresh unless you manually recreate your wheel.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Device-Specific:</strong> Saved wheels usually
                      don't sync across devices. Each device maintains its own
                      saved configurations.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Clearing Browser Data:</strong> If you clear
                      browser data or cookies, your saved wheels may be lost.
                      Consider creating screenshots of important configurations.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Step 8: Troubleshooting Common Issues
            </h2>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Issue: Wheel Won't Spin
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Ensure you have at least two active
                  entries on the wheel. Check that entries aren't all
                  deactivated. Refresh the page if the issue persists.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Issue: Can't See Entry Text Clearly
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Shorten entry names. Use
                  contrasting colors for text and background. Increase your
                  screen size or zoom level if needed.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Issue: Changes Not Saving
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Ensure your browser allows local
                  storage. Check browser settings if automatic saving isn't
                  working. Some tools require manual save actions.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Issue: Too Many Entries to Read
                </h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Solution:</strong> Consider splitting into multiple
                  wheels. Use shorter names or abbreviations. Limit wheels to
                  20-30 entries for optimal readability.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Step 9: Best Practices for Beginners
            </h2>
            <div className="space-y-4">
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 text-foreground">
                  Start Simple
                </h3>
                <p className="text-sm text-muted-foreground">
                  Begin with 3-5 entries to get comfortable with the tool.
                  Gradually add more entries as you become familiar with the
                  interface and features.
                </p>
              </Card>

              <Card className="p-4 bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 text-foreground">
                  Test Before Using
                </h3>
                <p className="text-sm text-muted-foreground">
                  Spin your wheel a few times in private before using it in a
                  real situation. This helps you understand how it works and
                  ensures everything is configured correctly.
                </p>
              </Card>

              <Card className="p-4 bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 text-foreground">
                  Keep Entry Names Clear
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use descriptive, concise names that participants will
                  understand immediately. Avoid abbreviations or codes unless
                  your audience knows what they mean.
                </p>
              </Card>

              <Card className="p-4 bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 text-foreground">
                  Verify Before Important Uses
                </h3>
                <p className="text-sm text-muted-foreground">
                  Double-check that all intended entries are included and
                  correctly named before using the wheel for important decisions
                  or activities.
                </p>
              </Card>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              You're Ready to Create Your First Wheel!
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              You now have all the knowledge you need to create your first
              custom spin wheel. The process is straightforward: add your
              entries, customize if desired, and spin to get random results.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Remember, the best way to learn is by doing. Create a simple wheel
              right now with a few test entries. Spin it a few times to see how
              it works. Then create your real wheel for your actual
              purpose—whether that's choosing lunch, picking students, or making
              any other decision.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Create Your First Wheel Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Explore Advanced Tutorials
                <PlayCircle className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </Card>

        {/* Related Articles */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">More Tutorials</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Discover advanced tutorials on customization, image uploads, and
              advanced features.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Browse Tutorials
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>

          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Get Support</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Having trouble creating your wheel? We're here to help!
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

export default TutorialCreatingYourFirstSpinWheel;
