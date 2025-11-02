import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { List, CheckCircle2, Edit, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const TutorialManagingSpinWheelEntries = () => {
  return (
    <>
      <Helmet>
        <title>Managing Spin Wheel Entries - Complete Guide | Hi Honey</title>
        <meta
          name="description"
          content="Learn how to manage spin wheel entries effectively. Discover how to add, edit, delete, activate, deactivate, and organize entries for optimal wheel functionality."
        />
        <meta
          name="keywords"
          content="spin wheel entries, manage wheel entries, edit entries, delete entries, activate entries, organize wheel, entry management"
        />
        <link
          rel="canonical"
          href="https://hihoney.site/tutorial-managing-spin-wheel-entries"
        />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <List className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Managing Spin Wheel Entries
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Complete Guide to Entry Management
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                Effective entry management is essential for creating and
                maintaining functional spin wheels. Whether you're adding new
                options, editing existing entries, or organizing your wheel,
                understanding how to manage entries efficiently will save you
                time and ensure your wheels work perfectly.
              </p>
              <p>
                This comprehensive tutorial covers all aspects of entry
                management: from adding and editing entries to deleting and
                organizing them. You'll learn advanced techniques like
                activating and deactivating entries, using shuffle and sort
                functions, and maintaining clean, organized wheels for different
                purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Basic Entry Operations
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Adding New Entries
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  To add a new entry, locate the input field in the entries
                  section (usually labeled "Add New Entry" or "Enter name...").
                  Type your entry name and press Enter or click the Add button.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Quick Tips:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Keep entry names concise and clear</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Press Enter after typing to add quickly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>You need at least two entries to spin</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Editing Existing Entries
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Click directly on an entry's text in the entries list to edit
                  it. Modify the text and press Enter or click outside the field
                  to save. The wheel updates automatically with your changes.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Deleting Entries
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Locate the delete icon (usually a trash can or X) next to each
                  entry. Click it to remove the entry from your wheel
                  permanently.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Important Note:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    You must maintain at least two entries to spin the wheel. If
                    you delete entries and only have one remaining, add another
                    before spinning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Activating and Deactivating Entries
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The activate/deactivate feature allows you to temporarily
                exclude entries from spins without deleting them. This is
                incredibly useful for managing active participants or available
                options.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">When to Deactivate</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4 mt-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>A student has already answered</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>A contestant has already won</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>An option is temporarily unavailable</span>
                    </li>
                  </ul>
                </Card>
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Edit className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">How to Toggle</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Click the toggle button (usually a checkbox or switch) next
                    to each entry. Deactivated entries remain visible but are
                    excluded from spins. Click again to reactivate.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Organizing Your Entries
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Shuffle Function
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  The shuffle button randomly reorders all entries while keeping
                  them active. This mixes up the visual arrangement on the
                  wheel, useful when you want to randomize the order of options.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Use Cases:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Mix up the visual order for variety</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Prevent predictable patterns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Randomize for fresh presentations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Sort Function
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  The sort button arranges all entries alphabetically. This
                  helps organize long lists and makes it easier to find specific
                  entries quickly.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Manual Reordering
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Some tools allow you to drag and drop entries to reorder them
                  manually. This gives you complete control over entry
                  arrangement on the wheel.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Advanced Management Techniques
            </h2>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Bulk Operations
                </h3>
                <p className="text-sm text-muted-foreground">
                  When managing many entries, work systematically: add all
                  entries first, then edit as needed, then organize. This
                  prevents errors and saves time.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Entry Groups
                </h3>
                <p className="text-sm text-muted-foreground">
                  For large wheels, consider grouping similar entries together
                  mentally, then organize them accordingly. Use consistent
                  naming patterns to maintain organization.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Regular Maintenance
                </h3>
                <p className="text-sm text-muted-foreground">
                  Periodically review and clean up your entries. Remove outdated
                  options, update names, and ensure all entries are still
                  relevant and correctly named.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Common Management Scenarios
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Classroom Student Selection
                </h3>
                <p className="mb-3">
                  Add all student names initially. As class progresses,
                  deactivate students who have already answered. Reactivate all
                  entries for the next class or activity.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Giveaway Winner Selection
                </h3>
                <p className="mb-3">
                  Add all participant names. After selecting a winner, delete or
                  deactivate that entry. Continue spinning for additional
                  prizes, removing winners after each selection.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Reusable Activity Wheels
                </h3>
                <p className="mb-3">
                  Create a master wheel with all possible activities. For each
                  use, deactivate unavailable options. After the session,
                  reactivate everything for next time.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Best Practices
            </h2>
            <div className="space-y-4">
              <Card className="p-4 bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 text-foreground">
                  Keep Names Consistent
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use consistent naming styles throughout your wheel (all first
                  names, all full names, etc.). This creates visual consistency
                  and prevents confusion.
                </p>
              </Card>

              <Card className="p-4 bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 text-foreground">
                  Verify Before Important Uses
                </h3>
                <p className="text-sm text-muted-foreground">
                  Before using your wheel for important activities, verify that
                  all intended entries are included, correctly named, and
                  properly activated or deactivated.
                </p>
              </Card>

              <Card className="p-4 bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 text-foreground">
                  Organize for Readability
                </h3>
                <p className="text-sm text-muted-foreground">
                  Use sort or manual organization to improve readability. Group
                  related entries together when possible, or use alphabetical
                  order for easy reference.
                </p>
              </Card>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Master Entry Management Today
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Effective entry management is the foundation of creating
              functional, organized spin wheels. Whether you're managing student
              lists, organizing activities, or maintaining reusable wheels,
              these techniques will help you work efficiently.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Practice these management techniques regularly, and you'll find
              that maintaining your wheels becomes second nature. The key is
              consistency and organization—well-managed entries create
              well-functioning wheels.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Manage Your Wheel Entries
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                More Management Tips
                <List className="h-4 w-4" />
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
              Continue learning with these tutorials
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
                to="/tutorial-advanced-spin-wheel-features"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Advanced Features →
              </Link>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Edit className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">How-to Guides</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Practical guides for using wheels
            </p>
            <div className="space-y-2">
              <Link
                to="/how-to-use-spin-wheels-in-classrooms"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Classroom Use →
              </Link>
              <Link
                to="/how-to-organize-events-with-random-selection"
                className="block text-sm font-semibold text-primary hover:underline"
              >
                Event Organization →
              </Link>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Get Help</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Questions about managing entries? We're here to help!
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

export default TutorialManagingSpinWheelEntries;
