class AddWebpushSubscriptions < ActiveRecord::Migration[6.0]
  def change
    create_table :webpush_subscriptions do |t|
      t.references :user, type: :integer, null: false, index: { unique: true }, foreign_key: true
      t.string :endpoint, null: false
      t.string :p256dh, null: false
      t.string :auth, null: false

      t.timestamps null: false
    end
  end
end
